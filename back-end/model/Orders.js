import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        product:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "product", 
            required: true,
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
})
const orderList = mongoose.model('order',orderSchema)
export default orderList