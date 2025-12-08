const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// DB Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
