import e from "express"
import { createOrder, fetchOrdersByUserId } from "../controller/orderController.js"
const orderRouter = e.Router()

orderRouter.post('/add',createOrder)
orderRouter.get('/:userId',fetchOrdersByUserId)

export default orderRouter