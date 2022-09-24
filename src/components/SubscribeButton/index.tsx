import { useSession, signIn } from 'next-auth/react';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe.js';

import styles from './style.module.scss';

interface Props {
  priceId: string;
}

export function SubscribeButton({ priceId }: Props) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    };

    try {
      const res = await api.post('subscribe');
      const { sessionId } = res.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    };

  };

  return(
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
};