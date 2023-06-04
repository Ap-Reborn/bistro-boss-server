const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ucorztq.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb+srv://bossUser:JquZht5zI3KpPSQi@cluster0.ucorztq.mongodb.net/?retryWrites=true&w=majority';

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
    await client.connect();


    const menuCollection = client.db("bistrodb").collection("menu");
    const riviewsCollection = client.db("bistrodb").collection("riviews");
    const cartCollection = client.db("bistrodb").collection("carts");

    // load menu data geting data from menu(menuCollection teke data pawar jonno get korteci)
    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    })
    // load menu data geting data from menu(menuCollection teke data pawar jonno get korteci)
    app.get('/riviews', async (req, res) => {
      const result = await riviewsCollection.find().toArray();
      res.send(result);
    })

    // cart collection (insert a document)
    app.post('/carts',async(req,res)=>{
      const item = req.body;
      console.log(item);
      const result = await cartCollection.insertOne(item);
      req.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('boss is sitting')
})
app.listen(port, () => {
  console.log(`bistro boss is sitting on port${port}`);
})

/*
*-----------------------------------
*       NAMING COVENTION
*----------------------------------
*user : userCollection
*app.get('/users')
*app.get('/users/:id')
*app.post('/users')
*app.patch('/users/:id')
*app.put('/users/:id')
*app.delete('/users/:id')
*
*
*
*
*
*
*/