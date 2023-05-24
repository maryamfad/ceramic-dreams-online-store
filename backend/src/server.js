import express from "express";
import { cartItems, products } from "./temp-data";

const app = express();

app.get('/healthCheck', (req, res)=>{
    res.send('Healthy!')
})

app.get('/products', (req, res)=>{
   res.json(products)
})

app.get('/cart', (req, res)=>{
   res.json(cartItems)
})

app.get('/products/:productId', (req, res)=>{
    const productId = req.params.productId
   const product = products.find(p => p.id === productId)
   res.json(product)
})
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
