const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
require("dotenv").config();
const app = express();

// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/api/products", productRoute);

// Test
app.get("/", (req, res) => {
  res.send("Hello from NODE API");
});

// Connection to the database
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
