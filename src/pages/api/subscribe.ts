import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { query as q } from 'faunadb';

import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe';

interface User {
  ref: {
    id: string;
  },
  data: {
    stripe_customer_id: string;
  },
}

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const { email } = session.user;

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(email)
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email
      });

      customerId = customer.id;
  
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: customerId
            }
          }
        )
      );
    };

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
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