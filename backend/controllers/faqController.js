
const conn = require('../config/db')

const { v4: uuidv4 } = require('uuid')

const getFaqs = (req, res, next) => {
   
   conn.query("SELECT * FROM message", function (err, data, fields) {
    if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data.length,
        data: data,
        message:'get FAQs'
      });
    });
  }

const createFaqs = (req, res, next) => {
   
    if(!req.body.message) {
      return next(new AppError(err, 404))
    }
    
      const id = uuidv4()
      const values = [id,req.body.message];

      conn.query(
        "INSERT INTO message (id, message) VALUES(?)",
        [values],
        function (err, data, fields) {
          if (err) return next(new AppError(err, 500));
          res.status(201).json({
            status: "success",
            message: "Message created!",
          });
        }
      );
    
    }

 const updateFaqs = (req, res) => {
    res.status(200).json({message:'update FAQs'})
 }

 const deleteFaqs = (req, res) => {
    res.status(200).json({message:'delete FAQs'})
 }

module.exports = {
    getFaqs, createFaqs,updateFaqs,deleteFaqs

}