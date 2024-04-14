const createReport = require("../model/createReport");
const User = require("../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

exports.createUser = async(req, res) => {
    try{
        const data = req.body;
        const existingUser = await User.findOne({email: data.email});
        if(existingUser){
            return res.json({success: false, message: "This Email is already Registered."})
        }
        let user;
        if(data.email === process.env.SUPER_OFFICER_EMAIL && data.username === process.env.SUPER_OFFICER_USERNAME) {
            user = new User({
                email: data.email,
                username: data.username,
                password: data.password,
                role: "Super Officer",
            })
        }else {
            user = new User({
                email: data.email,
                username: data.username,
                password: data.password,
            });
        }
        await user.save();
        return res.send({success: true, message: "User Created SuccessFully."});
    }catch(error) {
        console.log(error);
        return res.json({success: false, message: "Server Error."})
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const login = await User.findOne({email})
        if(!login) {
            return res.json({success: false, message: "No User Found."})
        }
        const isMatched = await login.comparePassword(password)
        if(!isMatched){
            return res.json({success: false, message: "Please enter correct password."})
        }
        const token = jwt.sign({id: login._id, username: login.username, role: login.role}, process.env.JWT_SECRET, {
            expiresIn: '3h',
        });
        return res.json({success: true, message: "Logged In SuccessFully", data: {login, token}})
    }catch(error) {
        console.log(error);
        return res.json({success: false, message: "Server Error."});
    }
}

exports.createReport = async(req, res) => {
    try{
        const report= req.body;
        const caseId = await createReport.findOne({caseId: report.caseId});
        if(caseId) {
            return res.json({success: false, message: "This CaseId Already Taken."})
        }
        let uploadResponse;
        if(report.file) {
            uploadResponse = await cloudinary.uploader.upload(report.file, {
                folder: "BlockChain/Report",
            })
        }
        const newReport = new createReport({
            caseId: report.caseId,
            nameOFVictim: report.nameOfVictim,
            description: report.description,
            incidentType: report.incidentType,
            bullyBehaviors: report.bullyBehavior,
            evidence: report.evidence,
            evidenceOther: report.evidenceOther,
            reportedBy: report.reportedBy,
            file: {
                public_id: uploadResponse.public_id,
                secure_url: uploadResponse.secure_url,
            },
        })
        await newReport.save();
        return res.json({success: true, message: "Report Created SuccessFully."});
    }catch(error) {
        console.log(error);
        return res.json({success: false, message: "Server Error."});
    }
}

exports.getAllReports = async(req, res) => {
    try {
        const getAllReports = await createReport.find({});
        return res.json({success: true, data: getAllReports}); 
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: "Server Error"});
    }
}

exports.createOfficer = async(req, res) => {
    try{
        const report = req.body;
        const existingUser = await User.findOne({email : report.email});
        if(existingUser){
            return res.json({success: false, message: "This Email is already in Use."})
        }
        const newOfficer = new User({
            email: report.email,
            username: report.username,
            password: report.password,
            role: report.role,
            department: report.department,
            rank: report.rank,
            name: report.name,
            batchNumber: report.batch,
        })
        await newOfficer.save();
        return res.json({success: true, message: "Officer Created SuccessFully."})
    }catch(error) {
        console.log(error);
        return res.json({success: false, message: "Server Error"})
    }
}

exports.getCasesCount = async(req, res) => {
    try{
        const condition = { isResolved: false };
        const getUnResolvedCount = await createReport.countDocuments(condition);
        const getTotalCount = await createReport.countDocuments();
        const getResolvedCount = getTotalCount - getUnResolvedCount;
        return res.json({success: true, data: {getResolvedCount,getTotalCount,getUnResolvedCount}})
    }catch(error) {
        return res.json({success: false, message: "Server Error"})
    }
}

exports.getIndividualReport = async(req, res) => {
    try{
        const caseId = req.params.id;
        const report = await createReport.findById(caseId);
        return res.json({success: true, data: report})
    }catch(error) {
        return res.json({success: false, message: "Server Error"})
    }
}

exports.updateStatus = async(req, res) => {
    try {
        const reportId = req.params.id;
        const report = await createReport.findById(reportId);
        report.isResolved = !report.isResolved;
        await report.save();
        
        return res.json({success: true, data: report, message: "Status Updated SuccessFully."})
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: "Server Error"})
    }
}

exports.deleteReport = async(req, res) => {
    try{
        const reportId = req.query;
        const report = await findByIdAndDelete(reportId);
        return res.json({success: true, message: "Report Deleted SuccessFully."})
    }catch(error) {
        return res.json({success: false, message: "Server Error"});
    }
}