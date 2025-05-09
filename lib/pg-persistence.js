const { Client } = require('pg');

const DATABASE = 'requestbin';

async function executeQuery(statement, ...parameters) {
  const client = new Client({ database: DATEBASE});
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
    const QUERY = `SELECT * FROM ${DATABASE} WHERE id = $1`;
    const result = await executeQuery(QUERY, targetId);
    return result.rows[0];
  }

  async createRequest(request, basket_id) {
    const timestamp = new Date.now();
    const QUERY = `INSERT INTO REQUEST (basket_id, method, timestamp)
                    VALUES ($1, $2, $3)`;
    const result = await executeQuery(QUERY, request.method, timestamp);
  }
}