import inventoryReqModel from "../models/inventoryReqModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto-js';
import productModel from "../models/productModel.js";

// Placing orders
const placeOrder = async (req, res) => {
    try {
        const { items, userInfo, projectInfo } = req.body;
        const userId = req.user.id;

        // Check if items array is empty
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Items array is empty' });
        }

        // Generate a verification key
        const rawString = userId + Date.now().toString();
        const hash = crypto.SHA256(rawString).toString();
        const verificationKey = hash.substring(0, 10).toUpperCase();

        // Construct order data
        const orderData = {
            userId,
            items,
            userInfo: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phone: userInfo.phone,
            },
            projectInfo: {
                projectName: projectInfo.projectName,
                projectDescription: projectInfo.projectDescription,
                projectTimeline: projectInfo.projectTimeline,
            },
            verificationKey,
            date: Date.now()
        };

        const newOrder = new inventoryReqModel(orderData);
        await newOrder.save();

        // Clear the cart after placing an order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ success: true, message: 'Request sent successfully' });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await inventoryReqModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// User order data for frontEnd
const userOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await inventoryReqModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await inventoryReqModel.findByIdAndUpdate(orderId, {
            status,
            approvedBy: req.user.id,
            approvedAt: new Date()
        });
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await inventoryReqModel.findById(orderId).populate('items._id');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for marking the request as issued – uses atomic $inc for stock
const markAsIssued = async (req, res) => {
    try {
        const { reqId } = req.body;
        const issuedDate = new Date();

        const order = await inventoryReqModel.findById(reqId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Inventory request not found' });
        }

        // Verify stock availability first
        for (const item of order.items) {
            const product = await productModel.findById(item._id);
            if (!product) {
                return res.status(400).json({ success: false, message: `Product ${item.name} not found in inventory` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ success: false, message: `Not enough stock for product ${item.name}` });
            }
        }

        // Atomically deduct stock for each item
        for (const item of order.items) {
            const result = await productModel.findOneAndUpdate(
                { _id: item._id, quantity: { $gte: item.quantity } },
                { $inc: { quantity: -item.quantity } },
                { new: true }
            );
            if (!result) {
                return res.status(400).json({ success: false, message: `Stock changed for ${item.name}, please retry` });
            }
        }

        // Mark as issued
        await inventoryReqModel.findByIdAndUpdate(reqId, {
            issuedDate,
            issuedBy: req.user.id,
            issuedAt: issuedDate
        });

        return res.json({ success: true, message: 'Request marked as issued and stock updated' });
    } catch (error) {
        console.error("Error marking request as issued:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for marking the request as returned – uses atomic $inc for stock
const markAsReturned = async (req, res) => {
    try {
        const { reqId } = req.body;
        const returnedDate = new Date();

        const order = await inventoryReqModel.findById(reqId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Inventory request not found' });
        }

        // Atomically return stock for each item
        for (const item of order.items) {
            const result = await productModel.findOneAndUpdate(
                { _id: item._id },
                { $inc: { quantity: item.quantity } },
                { new: true }
            );
            if (!result) {
                return res.status(400).json({ success: false, message: `Product ${item.name} not found in inventory` });
            }
        }

        // Mark as returned
        await inventoryReqModel.findByIdAndUpdate(reqId, {
            returnedDate,
            returnedBy: req.user.id,
            returnedAt: returnedDate
        });

        return res.json({ success: true, message: 'Stock updated' });
    } catch (error) {
        console.error("Error marking request as returned:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, allOrders, userOrders, updateStatus, getOrderDetails, markAsIssued, markAsReturned };
