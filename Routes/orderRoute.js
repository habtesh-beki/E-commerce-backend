const express = require('express')
const orderController = require('./../Controller/orderController')


const router = express.Router();
router.get('/' ,orderController.getAllOrder)
router.get('/:id' ,orderController.getOrderById)
router.post('/' , orderController.addOrderItems)
router.patch('/:id' ,orderController.updateOrderToPaid)
router.delete('/:id' , orderController.deleteOrder)


module.exports = router;