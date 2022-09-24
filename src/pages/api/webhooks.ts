import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunks === 'string' ? Buffer.from(chunk) : chunk
    );
  };

  return Buffer.concat(chunks);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const events = new Set([
  'checkout.session.completed'
]);

export default async function webhooks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method not allowed');
  };

  const buf = await buffer(req);
  const secret = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
  } catch(err) {
    return res.status(400).send(`Webhook error: ${err}`);
  };

  const { type } = event;

  if (events.has(type)) {
    switch(type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
       
        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString()
        );

        break;
      default:
        break;
    };
  };

  res.status(200).send({});
};