const Product = require('./../Models/productModels');
const catchAsync = require('./../utils/cathAsync');
const AppError = require('./../utils/appError');


exports.getAllProducts = catchAsync (async (req, res ,next) => {
     const products = await Product.find();
        res.status(200).json({
            status:"success",
            length:products.length,
            data:{
                products
         }
    });
});

exports.getProductById = catchAsync( async (req, res ,next) => {
      const product = await Product.findById(req.params.id);
       if(!product){
        return next(new AppError(`Product not found` , 404))
       }
        res.status(200).json({
            status:'success',
            data:{
                product
        }
    });
});

exports.createProduct = catchAsync(async (req, res ,next) => {
    const newProduct = await Product.create(req.body)
      res.status(201).json({
            status:"success",
            data:{
             newProduct
        }
     });
});

exports.updateProduct = catchAsync (async (req, res ,next) => {
     let updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if(!updatedProduct){
            return next(new AppError(`Product not found` , 404))
           }
         res.status(200).json({
            updatedProduct
     });   
});

exports.deleteProduct = catchAsync(async (req, res ,next) => {
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
        return next(new AppError(`Product not found` , 404))
       }
        res.status(200).json({ 
            message: 'Product deleted' 
   });
});
