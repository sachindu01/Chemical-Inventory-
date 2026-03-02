import mongoose from "mongoose"

const fundReqSchema = new mongoose.Schema({

    userId: {type: String, required: true},
    leader: { type: String, required: true },
    teamMembers: { type: Array, required: true },

    contactInfo: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    
    projectInfo: {
        projectTitle: { type: String, required: true },
        projectDescription: { type: String, required: true },
        goal: { type: String, required: false },
        risks: { type: String, required: false },
        projectType: { type: String, required: false },
        startingDate: { type: Date, required: true }, 
        completionDate: { type: Date, required: false },
      },

    supervisor: { 
        name:  { type: String, required: true },
        email: { type: String, required: false }
     },   

    budgetDetails: { type: String, required: true },
    status: { type: String, default: 'pending' },
    date: { type: Number, required: true },
    verificationKey: { type: String, required: true },
    issuedDate: {type: Date}
})

const fundReqModel = mongoose.models.fundReq || mongoose.model('fundReq', fundReqSchema)
export default fundReqModel
