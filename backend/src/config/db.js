const  mongoose  = require("mongoose"); 

// const { MongoClient, ServerApiVersion } = require('mongodb');

// const mongodbUrl="mongodb+srv://rashmi:ecommerce@cluster0.b24gn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = async()=>{
    return await mongoose.connect("mongodb://localhost:27017/?directConnection=true");
    // console.log(conn);
}

// const uri = "mongodb+srv://rrs:admin@ecommerce.4dllk.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDb() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }



module.exports={connectDb}
