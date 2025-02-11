import e from "express"
import { addProduct, deleteProduct, fetchProducts } from "../controller/ProductController.js"
const productRouter = e.Router()

productRouter.get('/products',fetchProducts)
productRouter.post('/addproduct',addProduct)
productRouter.delete('/deleteproduct',deleteProduct)

 export default productRouter

