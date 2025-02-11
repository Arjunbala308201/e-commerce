import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'product'
    }
    
})
const cart = mongoose.model('cart',cartSchema)
export default cart