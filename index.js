const express = require("express");
const mongoose = require("mongoose");
const joi = require("joi");
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const uri = "mongodb://127.0.0.1:27017/sign-up";

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to Mongo:", error);
  });

app.use(bodyParser.json());

const yep = mongoose.Schema({
  Email: String,
  Password: String,
  username: String,
});

const signUp = mongoose.model("user-login", yep);
// create five diff. endpoints, first is to sign up, second is login, third is to create a product, fourth is to get all product and last get single product

const schema = joi.object({
  Email: joi.string().email().lowercase().required(),
  Password: joi.string().min(6).required(),
  repeat_password: joi.ref("Password"),
  username: joi.string().alphanum().min(3).max(10).required(),
  access_token: [joi.string(), joi.number()],
});

// sign up
app.post("/signup", (req, res) => {
  const { error, value } = schema.validate(req.body);
  console.log(req.body);
  const newUser = new signUp({
    Email: value.Email,
    Password: value.Password,
    username: value.username,
  });
  newUser.save();
  res.status(201).send(newUser);
});

// login
app.post("/login", (req, res) => {
  const { email, passwor } = schema.validate(req.body);
});
// product
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  // rating: number,
});

const Product = mongoose.model("Product", productSchema);

app.post("/products", (req, res) => {
  const { value, error } = req.body;
  const newProduct = new Product({
    name: value.name,
    price: value.price,
    description: value.description,
    // rating: value.rating,
  });
  newProduct.save();
  res.status(201).send(newProduct);
});

// get
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.listen(3001, () => {
  console.log("server is listening on port");
});
