// index.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const razorpay = new Razorpay({
  key_id: process.env.razor_key,
  key_secret: process.env.razor_secret,
});

app.get('/', (req, res) => {
  res.render('index', { razorpay_key_id: process.env.razor_key });
});

app.post('/create-order', async (req, res) => {
  try {
    const amount = req.body.amount;

    const orderOptions = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        key1: 'value1',
        key2: 'value2',
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    res.render('order', { order, razorpay_key_id: process.env.razor_key });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Success route
app.post('/success', (req, res) => {
  // Handle success, e.g., update the order status in your database
  res.send('Payment successful!'); // You can redirect or render a success page here
});

// Cancel route
app.post('/cancel', (req, res) => {
  // Handle cancellation, e.g., update the order status in your database
  res.send('Payment cancelled.'); // You can redirect or render a cancellation page here
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
