const app=require(".");
const { connectDb } = require("./config/db"); 

const PORT=3000;
app.listen(PORT, async()=>
{
    await connectDb();
    console.log("ecommerce app listening on PORT:",PORT);
})