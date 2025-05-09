const { Client } = require('pg');

const DATABASE = 'requestbin';
const REQUESTS = 'request';
const BASKETS = 'basket';

async function executeQuery(statement, ...parameters) {
  const client = new Client({ database: DATABASE});
  await client.connect();
  const result = await client.query(statement, parameters);
  await client.end();
  return result;
}

module.exports = class PgPersistence {
  constructor(session) {
    this.username = session.username;
  }

  async getRequest(targetId) {
    const QUERY = `SELECT * FROM ${REQUESTS} WHERE id = $1`;
    const result = await executeQuery(QUERY, targetId);
    return result.rows[0];
  }

  async createRequest(request) {
    // TODO: Make sure request path actually matches the url of the basket
    const basket_id = getBasketByUrl(request.path);

    const timestamp = new Date(Date.now()).toUTCString();
    const QUERY = `INSERT INTO ${REQUESTS} (basket_id, method, time_stamp)
                    VALUES ($1, $2, $3)`;
    const result = await executeQuery(QUERY, basket_id, request.method, timestamp);
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
  }

  async getAllRequestsFromBasket(basketId) {
    const QUERY = `SELECT * FROM ${REQUESTS} WHERE basket_id = $1`;
    const result = await executeQuery(QUERY, basketId);
    return result.rows; 
  }
}