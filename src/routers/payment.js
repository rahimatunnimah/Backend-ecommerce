const express = require('express');

const router = express.Router();
const paymentController = require('../controllers/payment');
const auth = require('../helpers/auth')

router
    .get('/', auth.verify, paymentController.getPayment)
    .delete('/:id_payment', auth.verify, paymentController.deletePayment)


   


module.exports = router;