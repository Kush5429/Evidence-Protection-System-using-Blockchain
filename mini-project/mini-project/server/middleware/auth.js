const jwt = require("jsonwebtoken");

exports.verifyToken = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }
    try {
        // Verify the token using your secret key (replace 'your-secret-key' with your actual secret key)
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}