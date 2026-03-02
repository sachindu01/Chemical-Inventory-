import express from 'express'
import { placeFundReq, allFundReq, userFundReq, updateStatus, updateIssuedDate } from '../controllers/fundReqController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const staffOnly = [requireAuth, requireRole('HOD', 'INVENTORY_TO')];
const studentOnly = [requireAuth, requireRole('STUDENT')];
import upload from '../middleware/multer.js'

const fundReqRouter = express.Router()

//Admin features
fundReqRouter.post('/list', ...staffOnly, allFundReq)
fundReqRouter.post('/status', ...staffOnly, updateStatus)

// Fund request place features
fundReqRouter.post('/place', upload.single('budgetDetails'), ...studentOnly, placeFundReq)

// User features
fundReqRouter.post('/userreq', requireAuth, userFundReq)

fundReqRouter.post('/issue', ...staffOnly, updateIssuedDate)

export default fundReqRouter