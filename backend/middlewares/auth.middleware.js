const jwt = require('jsonwebtoken');
const JWT_SECRETE = "SURAJ@1223rnbgf";

module.exports = (req, res, next) =>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send("Enter a authenticate user");
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}