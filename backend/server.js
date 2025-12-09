const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);

// DB Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
