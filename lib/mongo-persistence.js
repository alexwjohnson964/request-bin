const MONGODB_URI = "mongodb://localhost:27017/requestbin"
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

module.exports = mongoClient;
