const stripe = require('stripe')(process.env.STRIPE_SECREATE_KEY)

exports.createPayment = async ( req, res) => {
    try{
      const {totalPrice} = req.body
      const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency:'USD'
    })

    res.status(200).json({
        //clientSecret:.client_secret
         paymentIntent,
    })
    }catch(err){
       res.status(400).json({
        status:'fail',
        message:err.message
       })
    }
   
}