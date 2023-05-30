import express from "express";
import { MongoClient } from "mongodb";
import path from 'path'

require("dotenv").config();
async function main() {
  const app = express();

  app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../assets')))
  const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.74roz0k.mongodb.net/?retryWrites=true&w=majority`;
  const dbClient = new MongoClient(dbUrl);
  await dbClient.connect();
  const db = dbClient.db("ceramic-dreams-db");

  app.get("/healthCheck", (req, res) => {
    res.send("Healthy!");
  });

  app.get("/api/products", async (req, res) => {
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  });

  const populateCartIds = async (ids) => {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  };
  app.get("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(user?.cartItems ||[]);
    res.json(populatedCart);
  });

  app.get("/api/products/:productId", async (req, res) => {
    const productId = req.params.productId;

    const product = await db.collection("products").findOne({ id: productId });
    res.json(product);
  });

  app.post("/api/users/:userId/cart", async (req, res) => {
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
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
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
    const populatedCart = await populateCartIds(user?.cartItems|| []);
    res.json(populatedCart);
  });
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

main();
