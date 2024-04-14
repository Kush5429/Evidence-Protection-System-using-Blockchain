const router = require("express").Router();
const multer = require("multer");

const {createUser, login,createReport, getAllReports, createOfficer,getCasesCount, 
    getIndividualReport,updateStatus, deleteReport} = require("../controller/user");
const {verifyToken} = require("../middleware/auth");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.post('/create', createUser);
router.post("/login", login);
router.post('/createReport', upload.any(), createReport);
router.get("/protectedRoute", verifyToken, (req, res) => {
        // Access the authenticated user information through req.user
        res.json({ success: true, message: 'Access granted', user: req.user });
    })
router.get('/getAllReports', getAllReports);
router.post("/createOfficer", createOfficer);
router.get("/getIndividualReport/:id", getIndividualReport);
router.get("/getCasesCount", getCasesCount);
router.post("/updateStatus/:id", updateStatus);
router.post("/deleteReport", deleteReport);
module.exports = router;