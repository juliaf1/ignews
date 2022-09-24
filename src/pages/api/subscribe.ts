import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { stripe } from '../../services/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const customer = await stripe.customers.create({
      email: session.user.email,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.NEXT_PUBLIC_URL + '/posts',
      cancel_url: process.env.NEXT_PUBLIC_URL,
    });

    return res.status(200).json({ sessionId: checkoutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send('Method not allowed');
  };
};