import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus, getOrderDetails, markAsIssued, markAsReturned } from '../controllers/inventoryReqController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const staffOnly = [requireAuth, requireRole('HOD', 'INVENTORY_TO')];
const studentOnly = [requireAuth, requireRole('STUDENT')];


const inventoryReqRouter = express.Router()

//Admin features
inventoryReqRouter.post('/list', ...staffOnly, allOrders)
inventoryReqRouter.post('/status', ...staffOnly, updateStatus)

// Order place features
inventoryReqRouter.post('/place', ...studentOnly, placeOrder)

// User features
inventoryReqRouter.post('/userorders', requireAuth, userOrders)

// Order details feature
inventoryReqRouter.get('/details/:orderId', requireAuth, getOrderDetails);

// Issue an order
inventoryReqRouter.post('/issue', ...staffOnly, markAsIssued);

// Return an order
inventoryReqRouter.post('/return', ...staffOnly, markAsReturned);



export default inventoryReqRouter