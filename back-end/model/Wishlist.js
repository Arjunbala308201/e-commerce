import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        product:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "product", 
            required: true  
        }
 
})
const wishList = mongoose.model('wishlist',wishlistSchema)
export default wishList