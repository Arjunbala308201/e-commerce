import mongoose from "mongoose";
import CartModel from "../model/Cart.js"; 

export const addTocart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.body.productId

        let userCart = await CartModel.findOne({ userId });

        if (userCart) {
            const alreadyExist = await CartModel.findOne({ userId, product: productId });

            if (alreadyExist) {
                console.log("Already in cart:", alreadyExist);
                return res.status(200).json({ toast:'warning',message: "Product already exists in cart" });
            }
            const newCartItem = new CartModel({ userId, product :productId });
            await newCartItem.save();

            return res.status(200).json({ toast:'success',message: "Added to cart", data: newCartItem });
        } else {
            const newCart = await CartModel.create({
                userId,
                product:productId
            });

            return res.status(200).json({toast:'success', message: "Added to cart", data: newCart });
        }
    } catch (error) {
        console.error("Error adding product:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const fetchFromCart = async (req, res) => {
    try {
        const userId = req.params.userId
        const products = await CartModel.find({userId:userId}).populate('product')
        console.log(products);
        if(products.length >0){
            res.status(200).json(products);
        }
        else{
            res.status(200).json({"message":'Your Cart is empty'});
        }
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send({
            message: error.message,
        });
    }
};

export const deleteFromCart = async (req, res) => {
    try {
      const userId = req.params.userId; 
      const productId = req.params.productId
        console.log(productId,'productid')
        console.log(userId,'userid')
        const userCart = await CartModel.find({userId:userId})
        if(userCart.length>0){
            const deletedProduct = await CartModel.deleteOne({product:productId})
            console.log('deleted Product',deletedProduct)
            res.status(200).send({
                message:'Product Deleted',
                data:deletedProduct
            })
        }
        else{
            response.status(500).send({message:"Error Occured"})
        }
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        message: 'Error deleting the product: ' + error.message,
      });
    }
  };
  