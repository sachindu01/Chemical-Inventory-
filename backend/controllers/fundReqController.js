import fundReqModel from "../models/fundReqModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary"
import crypto from 'crypto-js';

// Placing fund request
const placeFundReq = async (req, res) => {
    try {
        // Extracting required data from request body
        const {
            leader,
            teamMembers,
            contactInfo,
            projectInfo,
            supervisor,
        } = req.body;

        const userId = req.user.id;

        // Get the file path from Multer (this will be in req.file)
        const budgetDetails = req.file;

        // Upload the file to Cloudinary
        let budgetDetailsUrl = null;
        if (budgetDetails) {
            const result = await cloudinary.uploader.upload(budgetDetails.path, {
                resource_type: 'raw' // 'raw' for PDFs and other non-media files
            });
            budgetDetailsUrl = result.secure_url;
        }

        // Generate a hash for verification key (based on userId and date)
        const rawString = userId + Date.now().toString();
        const hash = crypto.SHA256(rawString).toString();
        const verificationKey = hash.substring(0, 10).toUpperCase();

        // Creating the fund request data
        const fundReqData = {
            userId,
            leader,
            teamMembers,
            contactInfo,
            projectInfo,
            supervisor,
            budgetDetails: budgetDetailsUrl,
            verificationKey,
            date: Date.now(),
        };

        // Creating a new fund request using the model
        const newFundReq = new fundReqModel(fundReqData);

        // Saving the fund request to the database
        await newFundReq.save();

        res.status(201).json({ success: true, message: 'Fund request submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


// All fundReq data for admin panel
const allFundReq = async (req, res) => {
    try {
        const fundRequests = await fundReqModel.find({});
        res.json({ success: true, fundRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// User fundReq data for frontEnd
const userFundReq = async (req, res) => {
    try {
        const userId = req.user.id;
        const userFundRequests = await fundReqModel.find({ userId });
        res.json({ success: true, userFundRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Update fundReq status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { reqId, status } = req.body
        await fundReqModel.findByIdAndUpdate(reqId, { status });
        res.json({ success: true, message: 'Status updated successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Update the issued date for a fund request
const updateIssuedDate = async (req, res) => {
    try {
        const { reqId, issuedDate } = req.body;
        const fundReq = await fundReqModel.findByIdAndUpdate(reqId, { issuedDate });

        if (fundReq) {
            return res.json({ success: true, message: 'Issued date updated successfully' });
        }
        return res.status(404).json({ success: false, message: 'Fund request not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeFundReq, allFundReq, userFundReq, updateStatus, updateIssuedDate }