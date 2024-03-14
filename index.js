const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
require("dotenv").config();
const app = express();

//Middlewares
app.use(express.json);
// app.use(express.urlencoded, ({extended:false}))

// router

// Controllers
app.get("/", (req, res) => {
  res.send("Hello from NODE API");
});
//API for getting all products(GET)
app.get("api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});
//API for getting a single product(GET)
app.get("api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByid({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//API for creating a product(POST)
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// API for updating a product(PUT)
app.put("/api/product/id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByidAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByid(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API for deleting a product
app.delete("/api/product/delete", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByidAndDelete(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully" });
});

//connection to the db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => {
    console.log("Connected to Database!");
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Listening on port ${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });
