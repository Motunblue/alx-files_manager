const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive () {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      await this.client.connect();
      console.log('Connected successfully to MongoDB');
      this.db = this.client.db(this.dbName);
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      console.log('Connected successfully to MongoDB');
      this.db = this.client.db(this.dbName);
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }

  // Disconnect from the MongoDB server
  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected successfully from MongoDB');
    } catch (err) {
      console.error('Error disconnecting from MongoDB:', err);
      throw err;
    }
  }

  // Insert a document into a collection
  async insertDocument(collectionName, document) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(document);
      console.log('Inserted document:', result.ops[0]);
      return result.ops[0];
    } catch (err) {
      console.error('Error inserting document:', err);
      throw err;
    }
  }

  // Find documents in a collection
  async findDocuments(collectionName, query) {
    try {
      const collection = this.db.collection(collectionName);
      const documents = await collection.find(query).toArray();
      console.log('Found documents:', documents);
      return documents;
    } catch (err) {
      console.error('Error finding documents:', err);
      throw err;
    }
  }
}

