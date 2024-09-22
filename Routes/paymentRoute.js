const express = require('express')
const authController = require('./../Controller/authController')
const paymentController = require('./../Controller/paymentController')

const router = express.Router();

router.post('/',authController.protect ,paymentController.createPayment )

module.exports = router;