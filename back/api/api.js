require('dotenv')
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_DATABASE } =
  process.env
const mysql = require('mysql')

async function getConnection() {
  const connection = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DATABASE,
  })
  await connection.connect()
  return connection
}

function query(connection, query, values) {
  return new Promise((res, rej) => {
    connection.query(query, values, (err, result) => {
      if (err)
        rej(
          `Query error [${query}]: ${err} [${JSON.stringify(
            process.env
          )}] [${DATABASE_HOST}]`
        )
      res(result)
    })
  })
}

async function addCustomerLine(connection, product, ip) {
  await query(
    connection,
    'INSERT INTO user_action (id_produit, ip,created_at) VALUES (?, ?, NOW()); ',
    [product, ip]
  )
  return { status: 200 }
}

async function fetchOthers(connection, filters) {
  const params = []
  let filtersChain = generateQuery(filters, params)
  var response
  try {
    response = await query(
      connection,
      'SELECT * FROM produit WHERE promo=1 OR type=99 ' + filtersChain,
      params
    )
  } catch (error) {
    throw error
  }

  return response
}
function generateQuery(filters, params) {
  let filtersChain = ''

  Object.keys(filters).forEach((k) => {
    if (filters[k]['value']) {
      filtersChain += ` AND ${k}${filters[k]['operator']}?`
      params.push(filters[k]['value'])
    }
  })
  return filtersChain
}

async function fetchProducts(connection, product, filters) {
  var type
  try {
    type = await query(
      connection,
      'SELECT type_n FROM type WHERE type_descriptif=?',
      [product]
    )
  } catch (error) {
    throw error
  }
  type = type[0].type_n

  const params = [type]
  let filtersChain = generateQuery(filters, params)
  var response
  try {
    response = await query(
      connection,
      'SELECT * FROM produit WHERE type=? ' + filtersChain,
      params
    )
  } catch (error) {
    throw error
  }

  return response
}

const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body)
    if (payload.product && (payload.filters || payload.ip)) {
      const connection = await getConnection()
      let data
      if (payload.ip) {
        data = await addCustomerLine(connection, payload.product, payload.ip)
      } else {
        if (payload?.others) {
          data = await fetchOthers(connection, payload.filters)
        } else {
          data = await fetchProducts(
            connection,
            payload.product,
            payload.filters
          )
        }
      }

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        },
        statusCode: 200,
        body: JSON.stringify({ body: data, statusCode: 200 }),
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
