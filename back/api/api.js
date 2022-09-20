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

async function fetchProducts(connection, product) {
  var response
  try {
    response = await query(
      connection,
      "SELECT * FROM produit where type_produit like '%" + product + "%'"
    )
  } catch (error) {
    throw error
  }

  return response
}

const handler = async (payload, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false
    if (payload.product) {
      const connection = await getConnection()
      const data = await fetchProducts(connection, payload.product)
      console.log(data)
      await connection.end()

      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
        },
        statusCode: 200,
        body: data,
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
