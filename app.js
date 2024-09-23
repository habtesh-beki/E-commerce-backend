const express = require('express');
const cors = require('cors')
/////////
const AppError = require('./utils/appError')
const globalErrorHandeler = require('./Controller/errorController')
const userRoute = require('./Routes/userRoute')
const productRoute = require('./Routes/productRoute')
const orderRoute = require('./Routes/orderRoute')
const paymentRoute = require('./Routes/paymentRoute')

const app = express();
app.use(cors({
   origin: 'https://e-commerce-frontend-roan-seven.vercel.app',  
   credentials: true,  
 }));


app.use(express.json());

// app.use('/' ,(req,res) {
//    res.send('hello')
// })
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/payments', paymentRoute)

app.all('*' , (req, res ,next) => {
   next(new AppError(`can't find URL ${req.originalUrl} on this server` , 404))
})
app.use(globalErrorHandeler)

module.exports = app