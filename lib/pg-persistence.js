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

  async getSomething(targetId) {
    const QUERY = `SELECT * FROM ${DATABASE} WHERE id = $1`;
    const result = await executeQuery(QUERY, targetId);
    return result.rows[0];
  }
}