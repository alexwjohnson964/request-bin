require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const { MongoClient, ObjectId } = require('mongodb');

// Mongo connection
const mongoClient = new MongoClient(MONGODB_URI);

async function connectMongo() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

connectMongo();

module.exports = class MongoPersistence {

  async createRequest(request) {
    const db = mongoClient.db('requestbin');
    const newRequest = await db.collection('webhookRequests').insertOne(request);
    const requestId = newRequest['insertedId'].toString();

    return requestId;
  }

  async getRequest(requestId) {
    console.log('request ID', requestId)
    const db = mongoClient.db('requestbin');
    const request = await db.collection('webhookRequests').findOne(new ObjectId(requestId));
    const {body, headers, query, path, ID} = request;
    return {body, headers, query, path, ID};
  }
}