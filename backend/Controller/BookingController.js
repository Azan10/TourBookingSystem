const Booking=require("../Models/Booking")
const AppError = require('../AppError')
const Tour=require("../Models/Tour")
const User=require("../Models/User")
require("dotenv").config()
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)


exports.getStripeSession = async (req, res, next) => {
    try {
        const tourId = req.params.tourId;
        const tour = await Tour.findById(tourId);
        
       

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode:'payment',
            success_url: "http://localhost:3001/success",
            cancel_url: "http://localhost:3001/dashboard",
            customer_email: req.user.Email,
            client_reference_id: tourId,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${tour.Name} Tour`,
                            images: [tour.imageURL]
                        },
                        unit_amount: tour.Price * 100
                    },
                    quantity: 1
                }
            ]
        });

        res.status(200).json({
            status: "success",
            session
        });

    } catch (error) {
   
       next(error)
    }
};







exports.stripeWebhook = async (req, res, next) => {
    const signature = req.headers['stripe-signature'];
   
    
    let event;
   
      

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
           
            process.env.STRIPE_WEB_KEY 
        );
    } catch (err) {
        
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        createBookingAfterPayment(session)
      
    }

    res.status(200).json({ received: true, message:"data received" });

};



  const createBookingAfterPayment = async session => {
    
    const tourId = session.client_reference_id;
    const userEmail = session.customer_email;
    const user = await User.findOne({ Email: userEmail });
    await Booking.create({ Tour: tourId, User: user._id });
};


