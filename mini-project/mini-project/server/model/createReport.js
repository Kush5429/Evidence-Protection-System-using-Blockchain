const mongoose = require("mongoose");

const createReportSchema = new mongoose.Schema({
    caseId: {
        type: Number,
        default: 0,
    },
    file: {
        // data: Buffer,
        // contentType: String, 
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },    
    },
    nameOFVictim: {
        type: String,
        default: "",
    },
    incidentType: {
        type: [String],
        default: [],
    },
    bullyBehaviors: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        default: "",
    },
    txtName: {
        type: String,
        default: "",
    },
    evidence: {
        type: [String],
        default: [],
    },
    evidenceOther: {
        type: String,
        default: "",
    },
    reportedBy: {
        type: String,
        default: "",
    },
    isResolved: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("CreateReport", createReportSchema);