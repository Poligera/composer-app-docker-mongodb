const { MongoClient } = require("mongodb");
// a Node.js library that handles connection and interaction with a MongoDB database

const connectionURL = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;

const init = async () => {
  let client = await MongoClient.connect(connectionURL);
  console.log("Connected to database!", dbName);
  return client.db(dbName);
};

module.exports = { init };
