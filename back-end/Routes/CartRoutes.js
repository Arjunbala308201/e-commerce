import express from 'express'
import { addTocart, fetchFromCart ,deleteFromCart} from '../controller/CartController.js'

const cartRouter = express.Router()

cartRouter.get('/:userId',fetchFromCart)
cartRouter.post('/add/:userId',addTocart)
cartRouter.delete('/delete/:userId/:productId',deleteFromCart)

export default cartRouter