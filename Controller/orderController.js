// const asyncHandler = require('express-async-handler');
const Order = require('./../Models/orderModels');
const catchAsync = require('./../utils/cathAsync')
const AppError = require('./../utils/appError')

exports.getAllOrder = catchAsync (async (req, res,next) => {
   const allOrder = await Order.find()
   res.status(200).json({
    status:'success',
    length:allOrder.length,
    data:{
        allOrder
    }
  })});

exports.addOrderItems =  catchAsync(async (req, res,next) => {
    const {user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const newOrder =await Order.create({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    res.status(201).json({
        status:'success',
        data:{
            newOrder
        }
    })
  }}
);

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user');
  if(!order){
   return   next(new AppError('there is not order in this id' , 404))
  }
  res.status(200).json({
    status:'success',
    data:{
        order
    }
})
});
exports.updateOrderToPaid = (async (req, res,next) => {
      const order = await Order.findByIdAndUpdate(req.params.id);
    res.status(200).json({
        status:'Success',
        data:{
            order
        }
    })
});

exports.deleteOrder = catchAsync(async (req, res,next) => {
 const order = await Order.findByIdAndDelete(req.params.id);

   if(!order){
    return   next(new AppError('there is not order in this id' , 404))
   }
        res.status(200).json({
        status:'SUCCESS',
        message:'orderDeleted'
        })
});

