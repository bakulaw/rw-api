const jwt  = require('jsonwebtoken')
const db = require('../config/db')

const protect = (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            db.query(
                    "SELECT username, hashedPassword FROM users where username=?",
                    decoded.username,
                    function (error, results, fields) {
                      if (error) throw error;
                      delete results[0]['hashedPassword']
                      req.user = results[0]
                      next()
                    //   return res.send({
                    //     error: false,
                    //     data: results[0],
                    //     message: "Fetch Successfully.",
                    //   });
                    }
                  );
            // req.user =
        }catch(error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
}

module.exports = { protect }