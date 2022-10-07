import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useSession, signIn, signOut } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button className={styles.signInButton} onClick={() => signOut()}>
      <FaGithub color="#04d361" className={styles.github} />
      { session.user.name }
      <FiX color="#737380" className={styles.signOut} />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" className={styles.github} />
      Sign in with Github
    </button>
  )
};