import express from 'express';
import { loginUser, registerUser, getMe, getAllUsers, getUserById, deleteUser, changeUserRole } from '../controllers/userController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser);
userRouter.get('/me', requireAuth, getMe);

const staffOnly = [requireAuth, requireRole('HOD', 'INVENTORY_TO')];

userRouter.post('/all', staffOnly, getAllUsers);
userRouter.post('/userid', staffOnly, getUserById);
userRouter.post('/role/userid', staffOnly, changeUserRole);
userRouter.post('/delete', staffOnly, deleteUser);

export default userRouter;