const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {createUser, loginUser, getUser,deleteUser, updateUser} = require('../controllers/user/userController')

// router.post('/',loginUser)
// router.get('/me', protect, getUser)
router.route('/').get( protect, getUser).post(loginUser)
// router.route('/:id').delete(deleteUser).put(updateUser)

module.exports = router