const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.SECRET;

const fetchuser = ((req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send("Please authenticate using a valid token");
    }else{
        try {
            const decoded = jwt.verify(token, secret);
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).send("Please authenticate using a valid token");
        }
    }
});

module.exports = fetchuser;