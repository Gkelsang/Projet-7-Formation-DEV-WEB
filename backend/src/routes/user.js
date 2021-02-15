const express = require('express')
// Importations //
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Routes users //
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.put('/edit', auth, multer, userCtrl.editUser)

module.exports = router
