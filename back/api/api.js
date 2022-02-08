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
      if (err) rej()
      res(result)
    })
  })
}

async function fetchProducts(connection, product, filters) {
  var type = await query(
    connection,
    'SELECT type_n FROM type WHERE type_descriptif=?',
    [product]
  )
  type = type[0].type_n

  let filtersChain = ''
  const params = [type]

  Object.keys(filters).forEach((k) => {
    filtersChain += ` AND ${k}${filters[k]['operator']}?`
    params.push(filters[k]['value'])
  })

  const response = await query(
    connection,
    'SELECT * FROM produit WHERE type=? ' + filtersChain,
    params
  )

  return response
}

const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body)
    if (payload.product && payload.filters) {
      const connection = await getConnection()
      const data = await fetchProducts(
        connection,
        payload.product,
        payload.filters
      )

      return {
        statusCode: 200,
        body: JSON.stringify({ status: 200, data }),
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
