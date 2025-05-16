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
   
    //const requestId = newRequest['insertedId'].toString();
    return requestId;
  }

  async getRequest(requestId) {
    console.log('id', requestId);
    const db = mongoClient.db('requestbin');
    const request = await db.collection('webhookRequests').findOne({_id: requestId});
    const {body, headers, query, path} = request;
    console.log('mongopath', path)
    return {body, headers, query, path};
  }
}


// module.exports = mongoClient;

// From Al's VPS
// MongoDB: Get all logs
// app.get('/logs', async (req, res) => {
//   try {
//     const db = mongoClient.db('my_mongo_db');
//     const logs = await db.collection('logs').find().toArray();
//     res.render('logs', { logs });
//   } catch (err) {
//     console.error('MongoDB query error:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// // MongoDB: Add a new log
// app.post('/logs', async (req, res) => {
//   const { logMessage } = req.body;
//   try {
//     const db = mongoClient.db('my_mongo_db');
//     await db.collection('logs').insertOne({ log: logMessage, timestamp: new Date() });
//     res.redirect('/logs');
//   } catch (err) {
//     console.error('MongoDB insert error:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });