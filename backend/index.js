import express from "express";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";
import cors from "cors";
import { Order } from "./orderModal.js";  

const app = express();
const port = 5000 || process.env.port;

app.use(cors(
  {
  origin:["https://cafe-app-frontend-seven.vercel.app/"],
  methods:["POST","GET"],
  credentials:true
  }
));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});

app.post("/", async (req, res) => {
  try {
    const { orders, totalPrice, gst, finalPrice } = req.body;
    
    const newOrder = { 
      orders,
      totalPrice,
      gst,
      finalPrice
    };

    const order = await Order.create(newOrder);
    res.status(201).json({ message: "Order received successfully", order });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Failed to process order" });
  }
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error(error));
