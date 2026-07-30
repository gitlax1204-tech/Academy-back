const express = require("express");
    const cors = require("cors");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const secretKey = 'your-secret-key';


    const app=express()
    const port=8000

    app.use(cors())
    app.use(express.json())


    
const { MongoClient, ServerApiVersion,ObjectId} = require('mongodb');
const uri = "mongodb://srirams3706_db_user:IVpVFdi4ZchUZNHh@ac-7dzs9gm-shard-00-00.xetcefv.mongodb.net:27017,ac-7dzs9gm-shard-00-01.xetcefv.mongodb.net:27017,ac-7dzs9gm-shard-00-02.xetcefv.mongodb.net:27017/?ssl=true&replicaSet=atlas-ll0hxi-shard-0&authSource=admin&appName=Cluster0";

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


     const usersCollection = client.db("academy").collection("login");


    app.post('/register', async (req, res) => {
      try {
        const { username, password } = req.body;

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }2

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ username, password: hashedPassword });


        res.status(201).json({ message: "User registered successfully" });
        console.log("User registered:", username);
      } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
      }
    });




    app.post('/login', async (req, res) => {
        try {
          const { username, password } = req.body;


          const user = await usersCollection.findOne({ username });
          if (!user) {
            return res.status(401).json({ message: "User not found. Please register." });
          }


          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
          }


          const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
          res.json({ token });
          console.log("User logged in:", username);
        } catch (error) {
          res.status(500).json({ message: "Error logging in", error });
        }
    });




    app.post('/verifyToken', (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ valid: false, message: 'No token provided' });
        }


        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
          }
          res.json({ valid: true, username: decoded.username });
        });
});




    const practice=client.db("academy").collection("aca")

      app.post("/upload",async(req,res)=>{
        const data=req.body;
        console.log(data);
        const result=await practice.insertOne(data);
        res.send(result);
    })




     app.get("/getdata",async(req,res)=>{
        const sdata=practice.find()
        const result=await sdata.toArray();
        res.send(result);
    })


    app.get("/getid/:id",async(req,res)=>{
        const id=req.params.id;
        const obj={_id:new ObjectId(id)};
        const result=await practice.findOne(obj);
        res.send(result);
    })


    app.delete("/del/:id",async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const obj={_id:new ObjectId(id)};
        const result=await practice.deleteOne(obj);
        res.send(result);
    })


    app.patch("/edit/:id",async(req,res)=>{
        const id=req.params.id;
        const obj={_id:new ObjectId(id)};
        const data=req.body;
        const updatedata={$set:{...data}};
        const options={upsert:true};
        const result=await practice.updateOne(obj,updatedata,options)
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!✅");
  } finally {
    // Ensures that the client will close when you finish/error
  //  await client.close();
  }
}

run().catch(console.dir);


      app.listen(port,()=>{
        console.log("🚀Port are running in", port)
    })
    