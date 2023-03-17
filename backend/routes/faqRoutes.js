const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {getFaqs, createFaqs, updateFaqs, deleteFaqs} = require('../controllers/faqController')

router.route('/').get(protect,getFaqs).post(protect,createFaqs)
router.route('/:id').delete(deleteFaqs).put(updateFaqs)



module.exports = router