const { response } = require('express');
const  jwt  = require('jsonwebtoken');
const User = require('../models/user.model');

const isJwtValid = (req, resp = response, next) => {
    const token = req.header('x-token');
    if (!token) { 
        return resp.status(401).json({
            ok: false,
            message: ' No token was sent by user'
        });
    }
    try {
        const { user_id } = jwt.verify(token, process.env.SECRET_KEY_JWT)
        req.user_id = user_id;
        next();
    } catch (error) {
        return resp.status(403).json({
            ok: false,
            message:'Invalid token'
        });
    }
}
isAdminUser= async (req, resp= response, next) => { 
    const user_id = req.user_id;
    const user_request = req.params.id
    try {
        const userDB = await User.findById(user_id);
        if (!userDB) {
            return resp.status(404).json({
                ok: false,
                message: `we couldn't find this user on DataBase`
            });
        }
        if (userDB.role === 'ADMIN_ROLE' || user_id===user_request) { 
            next()
        } { 
            return resp.status(403).json({
                ok: false,
                message: `You are not avable to do this acction`
            });
        }
       
        
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            message:'Internal Error'
        });
    }
}

module.exports = { isJwtValid, isAdminUser }
