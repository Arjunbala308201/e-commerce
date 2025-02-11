import express from 'express'
import { addTowishList, deleteFromwishList, fetchFromWish } from '../controller/WishlistController.js'

const wishlistRouter = express.Router()

wishlistRouter.get('/:userId',fetchFromWish)
wishlistRouter.post('/add/:userId',addTowishList)
wishlistRouter.delete('/delete/:userId/:productId',deleteFromwishList)

export default wishlistRouter