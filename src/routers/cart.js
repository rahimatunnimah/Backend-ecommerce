const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cart');
const checkoutControler = require('../controllers/order');
const auth = require('../helpers/auth');

router
    .get('/', auth.verify, cartController.getAllCart)
    .put('/:cart_id', auth.verify, cartController.editQty)
    .delete('/:cart_id', auth.verify, cartController.deleteCart)
    .delete('/all', auth.verify, cartController.deleteAllCart)
    .post('/order', auth.verify, checkoutControler.checkout)
   


module.exports = router;