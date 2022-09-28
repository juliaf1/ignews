import Link from 'next/link';
import { useRouter } from 'next/router';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
  const { asPath } = useRouter();

  function isActive(path) {
    return asPath === path ? styles.active : '';
  };

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/">
            <a className={isActive('/')}>Home</a>
          </Link>
          <Link href="/posts" prefetch>
            <a className={isActive('/posts')}>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
};