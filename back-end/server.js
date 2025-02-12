import express from "express";
import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";
import cors from 'cors'
import cartRouter from "./Routes/CartRoutes.js";
import wishlistRouter from "./Routes/WishlistRoutes.js";
import productRouter from "./Routes/ProductsRoutes.js";
import path from 'path'
import { fileURLToPath } from "url";
import orderRouter from "./Routes/orderRoutes.js";
import { authRouter } from "./Routes/AuthenticationRoutes.js";
import addressRouter from "./Routes/AddressRoutes";

configDotenv();

const app = express();
app.use(express.json());
app.use(cors())
app.use("/src", express.static("src"));
const port = process.env.PORT;
const dburl = process.env.MONGO_URL; 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/assets', express.static(path.join(__dirname, 'assets')));
console.log('Static files served from:', path.join(__dirname, 'assets'));

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err)  
  }
};
connectToDatabase();

app.get('/',(req,res)=>{
  res.send({
    message:'This is Home'
  })
})

 app.use('/',productRouter)
 app.use('/cart',cartRouter)
 app.use('/wishlist',wishlistRouter)
 app.use('/orders',orderRouter)
 app.use('/',authRouter)
 app.use('/address',addressRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
