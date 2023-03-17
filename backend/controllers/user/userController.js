const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username= LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (username, password) VALUES ('${
                req.body.username
              }', ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "The user has been registerd with us!",
                });
              }
            );
          }
        });
      }
    }
  );
};
const loginUser = (req, res, next) => {
    let q ="SELECT adminritm_db_1.users.hashedPassword, adminritm_db_1.users.username, pds_v2.tbldata.nme_first, pds_v2.tbldata.nme_last from adminritm_db_1.users  INNER JOIN pds_v2.tbldata ON  adminritm_db_1.users.username = pds_v2.tbldata.emp_id WHERE adminritm_db_1.users.username"
  db.query(
    `${q} = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["hashedPassword"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { username: result[0].username },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            db.query(
              `UPDATE users SET date_updated = now() WHERE id = '${result[0].id}'`
            );
            delete result[0]['hashedPassword']
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
};


const getUser = (req, res, next) => {

    return res.status(200).send({
        msg: "User Profile"
      });

}
// router.post("/get-user", signupValidation, (req, res, next) => {
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Bearer") ||
//     !req.headers.authorization.split(" ")[1]
//   ) {
//     return res.status(422).json({
//       message: "Please provide the token",
//     });
//   }
//   const theToken = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(theToken, "the-super-strong-secrect");
//   db.query(
//     "SELECT * FROM users where id=?",
//     decoded.id,
//     function (error, results, fields) {
//       if (error) throw error;
//       return res.send({
//         error: false,
//         data: results[0],
//         message: "Fetch Successfully.",
//       });
//     }
//   );
// });
module.exports = { createUser, loginUser, getUser };
