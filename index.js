const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const user = process.env.DB_USER
const password = process.env.DB_PASS

// console.log(user , password)

const uri = `mongodb+srv://${user}:${password}@cluster0.nkfqqut.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const collageCollections = client.db('collegeDB').collection('clgcard');
    const graduateCollections = client.db('collegeDB').collection('graduates');

    app.get('/clgcard', async(req, res)=> {
        const cursor = collageCollections.find();
        const result = await cursor.toArray();
        res.send(result);
    });
    app.get('/graduates', async(req, res)=> {
        const cursor = graduateCollections.find();
        const result = await cursor.toArray();
        res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Welcome to the Collage picker server!');
});

app.listen(port, () =>{
    console.log(`collage picker server is running on port : ${port}`);
});