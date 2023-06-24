const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require("body-parser");
const uri = "mongodb+srv://prince:Adawales01@prince.cd1a4as.mongodb.net/";

mongoose.connect = (uri,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to Mongo:", error);
  });
console.log("connection great", client);

app.use(bodyParser.json());

app.post("/createaccount", (req, res) => {
  res.send("heyyyyy");
});

app.get("/balance", (req, res) => {
  res.send("Balance");
});

app.get("/balance/:accountNumber", (req, res) => {
  res.send("account");
});

app.post("/transfer", (req, res) => {
  res.send("transfer");
});

app.listen(3000, console.log("Server is running "));
