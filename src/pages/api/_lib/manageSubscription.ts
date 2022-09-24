import { query as q, query } from 'faunadb';

import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

interface User {
  ref: {
    id: string;
  },
};

async function getSubscriptionData(subscriptionId: string, customerId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  async function findUserRef(customerId: string) {
    return await fauna.query<User>(
      q.Select(
        'ref',
        q.Get(
          q.Match(
            q.Index('user_by_customer_id'),
            customerId
          )
        )
      )
    );
  };

  const userRef = await findUserRef(customerId);

  return {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };
}

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  const data = await getSubscriptionData(subscriptionId, customerId);

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data }
    )
  );
};

export async function updateSubscription(
  subscriptionId: string,
  customerId: string
) {
  const data = await getSubscriptionData(subscriptionId, customerId);

  await fauna.query(
    q.Replace(
      q.Select(
        'ref',
        q.Get(
          q.Match(
            q.Index('subscription_by_id'),
            subscriptionId
          )
        )
      ),
      { data }
    )
  );
};