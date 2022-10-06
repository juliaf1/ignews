import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe.js';

import styles from './style.module.scss';

interface Props {
  priceId: string;
}

export function SubscribeButton({ priceId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const activeSubscription = session && session.activeSubscription;

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    };

    if (activeSubscription) {
      router.push('/posts');
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
      { !activeSubscription ? 'Subscribe now' : 'Start reading' }
    </button>
  )
};