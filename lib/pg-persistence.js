require('dotenv').config();
const { Client } = require('pg');

const DATABASE = 'requestbin';
const REQUESTS = 'requests';
const BASKETS = 'baskets';

async function executeQuery(statement, ...parameters) {
  const client = new Client({ 
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
    });
  try {
    await client.connect();
    const result = await client.query(statement, parameters);
    return result;
  } catch (error) {
    console.error('PG query error', error);
    throw error;
  } finally {
    await client.end();
  }  
}

module.exports = class PgPersistence {
  constructor(session) {
    // this.username = session.username; Probably don't need this
  }

  async getRequest(targetId) {
    const QUERY = `SELECT * FROM ${REQUESTS} WHERE id = $1`;
    const result = await executeQuery(QUERY, targetId);
    return result.rows[0];
  }

  async createRequest(request, requestId) {
    // TODO: Make sure request path actually matches the url of the basket
    // TODO: Make sure basket exists and handle if no basket exists
    const basketId = await this.getBasketByUrl(request.path.slice(1));
    const id = basketId.id;
   
    const timestamp = new Date(Date.now()).toUTCString();
    const QUERY = `INSERT INTO ${REQUESTS} (basket_id, mongo_id, method, time_stamp)
                    VALUES ($1, $2, $3, $4)`;
    const result = await executeQuery(QUERY, id, requestId, request.method, timestamp);
  }

  async getBasketByUrl(url) {
    const QUERY = `SELECT * FROM ${BASKETS} WHERE basket_url = $1`;
    const result = await executeQuery(QUERY, url);
    return result.rows[0];
  }

  async createBasket(url) {
    const QUERY = `INSERT INTO ${BASKETS} (basket_url)
                    VALUES ($1)`;
    const result = await executeQuery(QUERY, url);
    return result;
  }

  async getAllRequestsFromBasket(basketId) {
    const QUERY = `SELECT * FROM ${REQUESTS} WHERE basket_id = $1`;
    const result = await executeQuery(QUERY, basketId);
    return result.rows;
  }
};