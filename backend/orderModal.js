import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Order name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
  id: {
    type: Number,
    required: [true, "ID is required"],
  }
});

const orderSchema = new mongoose.Schema({
  orders: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: [true, "Total Price is required"],
  },
  gst: {
    type: Number,
    required: [true, "GST is required"],
  },
  finalPrice: {
    type: Number,
    required: [true, "Final Price is required"],
  },
}, {
  timestamps: true,
});

export const Order = mongoose.model('Order', orderSchema);
