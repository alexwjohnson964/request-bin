const MONGODB_URI = "mongodb://localhost:27017/requestbin"
const { MongoClient } = require('mongodb');

// Mongo connection
const mongoClient = new MongoClient(MONGODB_URI);
module.exports = mongoClient;
