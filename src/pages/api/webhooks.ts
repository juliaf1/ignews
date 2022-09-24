import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

import { stripe } from '../../services/stripe';
import { saveSubscription, updateSubscription } from './_lib/manageSubscription';

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

const EVENTS = {
  subscriptions: {
    created: 'customer.subscription.created',
    updated: 'customer.subscription.updated',
    deleted: 'customer.subscription.deleted',
  }
};

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

  switch(type) {
    case EVENTS.subscriptions.created:
    case EVENTS.subscriptions.updated:
    case EVENTS.subscriptions.deleted:
      const subscription = event.data.object as Stripe.Subscription;

      if (type === EVENTS.subscriptions.created) {
        await saveSubscription(
          subscription.id,
          subscription.customer.toString()
        );
      } else {
        await updateSubscription(
          subscription.id,
          subscription.customer.toString()
        );
      };

      break;
    default:
      break;
  };

  res.status(200).send({});
};