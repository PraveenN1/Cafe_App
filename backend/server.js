import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

import { MONGODB_URL } from "./config.js";
import { Order } from "./orderModal.js";  
import { User } from "./userModal.js";
import { UserResponse } from "./userRespModel.js";
import { ADMIN_USERNAME,ADMIN_PASSWORD_HASH} from "./adminDetails.js";

const app = express();
const port = 5000 || process.env.port;
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;

app.use(cors(
  {
  // origin:["https://cafe-app-frontend-seven.vercel.app"],
  origin:["http://localhost:5173"],
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

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    // console.log("Entered password:", password); 
    // console.log("Stored hashed password:", user.password); 

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup",async(req,res)=>{
  try{
    const {username,password}=req.body;

    if(!username || !password){
      return res.status(400).json({message:"Please provide all required fields"});
    }

    const existingUser=await User.findOne({username});
    if(existingUser){
      return res.status(400).json({message:"Username already exists"});
    }

    const newUser=new User({username,password});
    await newUser.save();
    res.status(201).json({message:"User registered successfully!"});
  }catch{
    console.error("Error in signup",error);
    res.status(500).json({message:"An error occured.Please try again later"});
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;
    
    if (!firstname || !lastname || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newResponse = new UserResponse(req.body);
    await newResponse.save();

    res.status(201).json({ message: "Response received successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/admin-login",async(req,res)=>{
  try{
    const {username,password}=req.body;
    if(!username || !password){
      return res.status(400).json({message:"username and password are required"});
    }
    if(
      username===ADMIN_USERNAME && (await bcrypt.compare(password,ADMIN_PASSWORD_HASH))
    ){
      const token =jwt.sign({role:"admin"},jwtSecretKey,{expiresIn:"1h"});
      return res.status(200).json({message:"Login Successful",token});
    }
    return res.status(401).json({message:"Invalid credentials"});
  }catch(error){
    console.error("Error during admin login:",error);
    return res.status(500).json({message:"Internal server error"});
  }
})
app.get("/admin/dashboard", verifyAdminToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard" });
});

app.get("/admin/dashboard/orders",async(req,res)=>{
  try{
    const orders=await Order.find().sort({createdAt:-1});
    // console.log(orders);
    res.status(200).json(orders);
  }catch(error){
    res.status(500).json({message:'Failed to fetch orders',error});
  };
})

// Middleware for verifying admin token
function verifyAdminToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token,jwtSecretKey);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
}

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server running successfully!");
    });
  })
  .catch((error) => console.error(error));
