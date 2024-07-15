const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Razorpay = require('razorpay');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const razorpay = new Razorpay({
    key_id: process.env.REACT_APP_RAZOR_KEY,
    key_secret: process.env.REACT_APP_RAZOR_SECRET_KEY
});

exports.createRazorpayOrder = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: 'INR',
        };

        try {
            const order = await razorpay.orders.create(options);
            res.status(200).send(order);
        } catch (error) {
            res.status(500).send(error);
        }
    });
});
