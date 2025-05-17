require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

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
    //return newRequest;
    const requestId = newRequest['insertedId'].toString();
    //db.collection('webHookRequests').updateOne()

    return requestId;
  }

  async getRequest(requestId) {
    console.log('request ID', requestId)
    const db = mongoClient.db('requestbin');
    const request = await db.collection('webhookRequests').findOne(ObjectId(requestId));
    // const request = await db.collection('webhookRequests').findOne({insertedId: requestId});
    const {body, headers, query, path, ID} = request;
    return {body, headers, query, path, ID};
  }
}