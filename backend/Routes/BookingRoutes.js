const express = require("express");
const bodyParser = require('body-parser'); // Don't forget this line
const router = express.Router();
const controller = require("../Controller/BookingController");
const authController = require('../Controller/AuthController');

router.get(
    "/checkout-session/:tourId",
    authController.protect,
    controller.getStripeSession
);

// Apply body-parser.raw() middleware just to the Stripe route
router.post("/webhook-stripe", bodyParser.raw({ type: 'application/json' }), controller.stripeWebhook);

module.exports = router;
