// index.js
const connectDB = require('./Config/connectDB');
const personModel = require('./Models/personModel');
const personRoutes = require('./Routes/personRoutes');
const express = require("express")
const app = express()
app.use(express.json())
app.use("/person", personRoutes)



// Connect to the database
connectDB();


app.listen(5000, (err)=> {
  err? console.error(err): console.log("server is running on 5000");
})