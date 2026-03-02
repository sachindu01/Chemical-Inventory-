import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const staffOnly = [requireAuth, requireRole('HOD', 'INVENTORY_TO')];

const productRouter = express.Router();

productRouter.post(
  '/add',
  ...staffOnly,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'locationImage1', maxCount: 1 },
    { name: 'locationImage2', maxCount: 1 },
  ]),
  addProduct
);
productRouter.post('/remove', ...staffOnly, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.post('/update', ...staffOnly, updateProduct);

export default productRouter