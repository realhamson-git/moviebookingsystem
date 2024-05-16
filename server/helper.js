const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "MV!Book"

module.exports.encrypt_password = async ( password ) => {
    const SaltRound = 10
    const salt = await bcrypt.genSalt( SaltRound )
    return await bcrypt.hash( password, salt )
}

module.exports.compare_password = async ( password, hash ) => {
    return await bcrypt.compare( password, hash  )
}

module.exports.jwt_sign = ( id ) => {
    const data = {
        time: new Date(), 
        userID: id
    }

    return jwt.sign( data, SECRET_KEY, { expiresIn: '3d' } )
}