import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config();

const app = express();
const port = process.env.PORT || 4242;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Stripe backend is running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 