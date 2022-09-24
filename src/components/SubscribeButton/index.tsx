import { useSession, signIn } from 'next-auth/react';

import { api } from '../../services/api';

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
    }

  };

  return(
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
};