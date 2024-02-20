const jwt=require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.TOKEN_SECRET

function createAccessToken(payload) {

    return new Promise(function(resolve, reject) {
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: "1d",
          },
          (err, token) => {
            if (err) reject(err);
            resolve(token);
          }
        );
    })
}



module.exports={
    createAccessToken
}