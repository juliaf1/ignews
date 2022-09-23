import { SubscribeButton } from '../SubscribeButton';

import styles from './styles.module.scss';

interface Props {
  productPrice: number;
}

export function HomeBanner({ productPrice }: Props) {
  return(
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world</h1>
        <p>
          Get access to all publications<br/>
          <span>for ${productPrice}/month</span>
        </p>
        <SubscribeButton />
      </section>

      <img src="/images/avatar.svg" alt="" />
    </main>
  )
};