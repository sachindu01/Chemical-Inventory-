import inventoryReqModel from "../models/inventoryReqModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto-js';
import productModel from "../models/productModel.js";

// Placing orders 
const placeOrder = async (req, res) => {
    console.log("Request body:", req.body); // Log the incoming request body
    try {
        const { items, userInfo, projectInfo } = req.body;
        const userId = req.user.id;

        // Check if items array is empty
        if (!items || items.length === 0) {
            console.log("Items array is empty");
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

        // Log the order data to verify structure before saving
        console.log("Order data before saving:", JSON.stringify(orderData, null, 2));

        const newOrder = new inventoryReqModel(orderData);
        await newOrder.save();

        // Log a success message after saving
        console.log("Order saved successfully with ID:", newOrder._id);

        // Clear the cart after placing an order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        console.log("Cart cleared for user:", userId);

        res.json({ success: true, message: 'Request sent successfully' });
    } catch (error) {
        console.log("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await inventoryReqModel.find({});
        console.log("Fetched all orders:", orders.length);
        res.json({ success: true, orders });
    } catch (error) {
        console.log("Error fetching all orders:", error);
        res.json({ success: false, message: error.message });
    }
}

// User order data for frontEnd
const userOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await inventoryReqModel.find({ userId });
        console.log(`Fetched orders for user ${userId}:`, orders.length);
        res.json({ success: true, orders });
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.json({ success: false, message: error.message });
    }
}

// Update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        console.log(`Updating order ${orderId} to status: ${status}`);
        await inventoryReqModel.findByIdAndUpdate(orderId, {
            status,
            approvedBy: req.user.id,
            approvedAt: new Date()
        });
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.log("Error updating order status:", error);
        res.json({ success: false, message: error.message });
    }
}

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params; // Get orderId from request parameters
    try {
        const order = await inventoryReqModel.findById(orderId).populate('items._id'); // Populate item details if needed
        if (!order) {
            console.log("Order not found:", orderId);
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        console.log("Fetched order details:", order);
        res.json({ success: true, order });
    } catch (error) {
        console.log("Error fetching order details:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for marking the request as issued
const markAsIssued = async (req, res) => {
    try {
        const { reqId } = req.body;
        const issuedDate = new Date();
        console.log(`Marking request ${reqId} as issued on ${issuedDate}`);

        const order = await inventoryReqModel.findByIdAndUpdate(reqId, {
            issuedDate,
            issuedBy: req.user.id,
            issuedAt: issuedDate
        });
        if (!order) {
            console.log("Inventory request not found:", reqId);
            return res.json({ success: false, message: 'Inventory request not found' });
        }

        // Loop through the items in the request and update the inventory
        for (const item of order.items) {
            const product = await productModel.findById(item._id);
            if (!product) {
                console.log(`Product ${item.name} not found in inventory`);
                return res.status(400).json({ success: false, message: `Product ${item.name} not found in inventory` });
            }

            // Check if the product has enough stock to fulfill the request
            if (product.quantity >= item.quantity) {
                product.quantity -= item.quantity; // Deduct the requested quantity from stock
                await product.save(); // Save the updated product
            } else {
                console.log(`Not enough stock for product ${item.name}`);
                return res.status(400).json({ success: false, message: `Not enough stock for product ${item.name}` });
            }
        }
        return res.json({ success: true, message: 'Request marked as issued and stock updated' });
    } catch (error) {
        console.log("Error marking request as issued:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for marking the request as returned
const markAsReturned = async (req, res) => {
    try {
        const { reqId } = req.body;
        const returnedDate = new Date();
        console.log(`Marking request ${reqId} as returned on ${returnedDate}`);

        const order = await inventoryReqModel.findByIdAndUpdate(reqId, {
            returnedDate,
            returnedBy: req.user.id,
            returnedAt: returnedDate
        });
        if (!order) {
            console.log("Inventory request not found:", reqId);
            return res.json({ success: false, message: 'Inventory request not found' });
        }

        // Loop through the items in the request and update the inventory
        for (const item of order.items) {
            const product = await productModel.findById(item._id);
            if (!product) {
                console.log(`Product ${item.name} not found in inventory`);
                return res.status(400).json({ success: false, message: `Product ${item.name} not found in inventory` });
            }

            product.quantity += item.quantity;
            await product.save();
        }

        return res.json({ success: true, message: 'Stock updated' });
    } catch (error) {
        console.log("Error marking request as returned:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, allOrders, userOrders, updateStatus, getOrderDetails, markAsIssued, markAsReturned };
