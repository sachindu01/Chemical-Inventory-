import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import inventoryReqRouter from './routes/inventoryReqRoutes.js'
import fundReqRouter from './routes/fundReqRoutes.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())

// CORS – restrict to known origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:5174']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// Rate limiting on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: { success: false, message: 'Too many attempts, please try again after 15 minutes' }
})

// api endpoints
app.use('/api/user/login', authLimiter)
app.use('/api/user/register', authLimiter)

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', inventoryReqRouter)
app.use('/api/fund', fundReqRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log('Server Started on port: ' + port))