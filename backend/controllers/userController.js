import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        if (!user.isActive) {
            return res.json({ success: false, message: "Account is disabled" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id, user.userRole)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Route for user Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // Restricting registration to "@sci.pdn.ac.lk" emails only
        const emailDomainRegex = /^[a-zA-Z0-9._%+-]+@sci\.pdn\.ac\.lk$/;
        if (!emailDomainRegex.test(email)) {
            return res.json({ success: false, message: "Only emails from @sci.pdn.ac.lk are allowed" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            userRole: 'STUDENT' // Force role to STUDENT on self-registration
        })

        const user = await newUser.save()
        const token = createToken(user._id, user.userRole)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for getting current logged-in user info /me
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userRole: user.userRole
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, 'name email userRole isActive');
        res.json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId, 'name email userRole isActive');

        if (!user) {
            console.log("User not found in the database.");
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
};

// Update user role
const changeUserRole = async (req, res) => {
    try {
        const { userId, userRole } = req.body

        // Check if userId is valid
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid or missing userId' });
        }

        // Validate role explicitly
        const validRoles = ["STUDENT", "LECTURER", "HOD", "INVENTORY_TO"];
        if (!validRoles.includes(userRole)) {
            return res.status(400).json({ success: false, message: 'Invalid role provided' });
        }

        await userModel.findByIdAndUpdate(userId, { userRole })
        res.json({ success: true, message: 'Role updated successfully' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};


export { loginUser, registerUser, getMe, getAllUsers, getUserById, deleteUser, changeUserRole }