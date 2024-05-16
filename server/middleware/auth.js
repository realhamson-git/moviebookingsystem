const { UserModel } = require('../models/index')
const jwt = require('jsonwebtoken')

module.exports.verify_user = async (req, res, next) => {
    try {
        const SECRET_KEY = "MV!Book"

        if (!req.header('auth-token')) {
            res.status(401).send('Not Authorized')
            return
        }
        
        let verify = jwt.verify(req.header('auth-token'), SECRET_KEY)
        let user = await UserModel.findOne({ _id: verify.userID })
        // console.log( verify )
        if( user ){
            req.user = user
            next();

        } else {
            return res.status(401).send('Invalid Token')
        }

    } catch (error) {
        console.log(error)
        return res.status(401).send('Invalid Token')
    }
}