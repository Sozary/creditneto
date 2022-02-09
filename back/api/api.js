require('dotenv').config()
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
      if (err) rej(`Query error [${query}]: ${error}`)
      res(result)
    })
  })
}

async function fetchProducts(connection, product, filters) {
  var type
  try {
    type = await query(
      connection,
      'SELECT type_n FROM type WHERE type_descriptif=?',
      [product]
    )
    console.log('type ok')
  } catch (error) {
    throw error
  }
  type = type[0].type_n

  let filtersChain = ''
  const params = [type]

  Object.keys(filters).forEach((k) => {
    filtersChain += ` AND ${k}${filters[k]['operator']}?`
    params.push(filters[k]['value'])
  })
  console.log('filtrers ok')
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
  console.log('all ok!')

  return response
}

const handler = async (event) => {
  try {
    console.log('salut')
    const payload = JSON.parse(event.body)
    console.log('parse')
    if (payload.product && payload.filters) {
      console.log('here')
      const connection = await getConnection()
      console.log('connected')
      const data = await fetchProducts(
        connection,
        payload.product,
        payload.filters
      )
      console.log('get prod')

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        },
        statusCode: 200,
        body: JSON.stringify({ status: 200, data }),
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
