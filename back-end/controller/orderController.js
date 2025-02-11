import mongoose from "mongoose";
import Order from "../model/Orders.js";  // Adjust to correct model path
import User from "../model/UserModel.js";  // Adjust to correct model path

export const createOrder = async (req, res) => {
  try {
    const orders = req.body.orders
    console.log(req.body,'req.body')
    const {userId} = req.body.orders[0]
    console.log(userId,'from req')

    if (!userId || !Array.isArray(orders) || orders.length === 0) {
      res.status(400).json({ message: "Invalid order data" });
      console.log('invalid order data')
    }

    const user = await User.find({_id:userId});
    if (!user) {
      res.status(404).json({ message: "User not found" });
      console.log('user not found')
    }

    const savedOrder = await Order.insertMany(orders);
    console.log('Order placed');

    res.status(201).json({
      message: "Order places successfully",
      order: savedOrder,
      toast:'success'
    });
    console.log("Order placed successfully");
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};


export const fetchOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;  // Get the userId from request params
    console.log(userId,'userid throuhg params')
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userOrders = await Order.find({ userId: userId }).populate('product')
    console.log(userOrders)

    // Check if orders are found
    if (userOrders.length === 0) {
      return res.status(404).json({ message: "No userOrders found for this user" });
    }
      if(userOrders.length>0){
        res.status(200).json({
          message: "userOrders fetched successfully",
          data: userOrders,
        });
        console.log('data sent to fronend')
      }

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};




