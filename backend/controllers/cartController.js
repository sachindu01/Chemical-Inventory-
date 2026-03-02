import userModel from '../models/userModel.js';

// add products to user cart
const addToCart = async (req, res) => {
    try {
        const { itemId, quantity, unit } = req.body;
        const userId = req.user.id;

        console.log("Adding to cart:", { userId, itemId, quantity, unit });

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {}; // Ensure cartData is an object

        // Initialize the item in cartData if not present
        if (cartData[itemId]) {
            console.log(`Item ${itemId} already in cart, updating quantity.`);
            cartData[itemId].quantity += quantity; // Increase quantity if item exists
        } else {
            console.log(`Adding new item ${itemId} to cart.`);
            cartData[itemId] = { quantity, unit }; // Set new item with quantity and unit
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        console.log("Updated cart data:", cartData);
        res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
        console.log("Error adding to cart:", error);
        res.json({ success: false, message: error.message });
    }
};

// update user cart
const updateCart = async (req, res) => {
    try {
        const { itemId, quantity, unit } = req.body;
        const userId = req.user.id;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // Remove the item if quantity is 0; otherwise, update quantity and unit
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = { quantity, unit };
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get user cart data
const getUserCart = async (req, res) => {
    try {
        // userId is now extracted from the verified token
        const userId = req.user.id;

        console.log("Retrieving cart for user:", userId);

        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {}; // Ensure cartData is at least an empty object

        console.log("User cart data:", cartData);
        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Error retrieving cart:", error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
