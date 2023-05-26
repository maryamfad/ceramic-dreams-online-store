import express from "express";
import { MongoClient } from "mongodb";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./temp-data";

let cartItems = cartItemsRaw;
let products = productsRaw;
async function main() {
  require("dotenv").config();
  const app = express();

  app.use(express.json());

  const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.74roz0k.mongodb.net/?retryWrites=true&w=majority`;
  const dbClient = new MongoClient(dbUrl);
  await dbClient.connect();
  const db = dbClient.db("ceramic-dreams-db");

  app.get("/healthCheck", (req, res) => {
    res.send("Healthy!");
  });

  app.get("/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  });

  const populateCartIds = async (ids) => {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  };
  app.get("/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("/products/:productId", async (req, res) => {
    const productId = req.params.productId;

    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  app.post("/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    await db.collection("users").updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId },
      }
    );

    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.delete("/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db.collection("users").updateOne(
      { id: userId },
      {
        $pull: { cartItems: productId },
      }
    );
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

main();
