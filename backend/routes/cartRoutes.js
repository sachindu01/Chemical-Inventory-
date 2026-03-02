import express from 'express'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';

const cartRouter = express.Router()

const studentOnly = [requireAuth, requireRole('STUDENT')];

cartRouter.post('/get', ...studentOnly, getUserCart)
cartRouter.post('/add', ...studentOnly, addToCart)
cartRouter.post('/update', ...studentOnly, updateCart)

export default cartRouter