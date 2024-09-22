const express = require('express')
const productController = require('./../Controller/productController')
const authController = require('./../Controller/authController')


router = express.Router()

router.get('/' ,authController.protect, productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.post('/' , productController.createProduct)
router.patch('/:id' , productController.updateProduct)
router.delete('/:id' ,authController.protect ,authController.restrictTo('admin'), productController.deleteProduct)


module.exports = router;