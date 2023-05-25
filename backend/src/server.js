import express from "express";
import { MongoClient } from "mongodb";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./temp-data";

let cartItems = cartItemsRaw;
let products = productsRaw;

require('dotenv').config()
const app = express();

app.use(express.json());

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.74roz0k.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(dbUrl);

app.get("/healthCheck", (req, res) => {
  res.send("Healthy!");
});

app.get("/products", async (req, res) => {
  await dbClient.connect();
  const db = dbClient.db("ceramic-dreams-db");
  const products = await db.collection("products").find({}).toArray();
  res.json(products);
});

const populatedCartIds = (ids) => {
  return ids.map((id) => products.find((p) => p.id === id));
};
app.get("/cart", (req, res) => {
  const populatedCart = populatedCartIds(cartItems);
  res.json(populatedCart);
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.id === productId);
  res.json(product);
});

app.post("/cart", (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populatedCartIds(cartItems);
  res.json(populatedCart);
});

app.delete("/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  const remainingCartItems = cartItems.filter((id) => id !== productId);
  const populatedCart = populatedCartIds(remainingCartItems);
  res.json(populatedCart);
});
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
