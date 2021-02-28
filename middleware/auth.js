const config = require('config');
const  jwt = require('jsonwebtoken');

// bcryp and jwt variables
const jwtSct  = config.get("jwtSecret");
const saltRounds = 10;

module.exports = function (req, res, next){

    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:"No  token authorisation denied"})
    }
    
    try {
        const decoded = jwt.verify(token, jwtSct);
        req.user = decoded.user;
        next()
    } catch (err) {
        return res.status(401).json({msg:"token is not valid"})
    }
}


