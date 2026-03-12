import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String },
}, { _id: false });

const inventoryReqSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: { type: [inventoryItemSchema], required: true },
    status: { type: String, required: true, default: 'pending' },

    userInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    projectInfo: {
        projectName: { type: String, required: true },
        projectDescription: { type: String, required: true },
        projectTimeline: { type: String, required: true },
    },

    date: { type: Number, required: true },
    verificationKey: { type: String, required: true },

    // Issue / return dates
    issuedDate: { type: Date, default: null },
    returnedDate: { type: Date, default: null },

    // Audit trail
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    approvedAt: { type: Date, default: null },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    issuedAt: { type: Date, default: null },
    returnedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    returnedAt: { type: Date, default: null },
}, { timestamps: true })

const inventoryReqModel = mongoose.models.inventoryReq || mongoose.model('inventoryReq', inventoryReqSchema)
export default inventoryReqModel;