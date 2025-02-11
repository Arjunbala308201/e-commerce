import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    image:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    isStock:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    specialPrice:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})
const product = mongoose.model('product',productSchema)
export default product