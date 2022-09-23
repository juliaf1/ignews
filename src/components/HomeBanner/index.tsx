import { SubscribeButton } from '../SubscribeButton';
import { HomeProps } from '../../pages';

import styles from './styles.module.scss';

export function HomeBanner({ product }: HomeProps) {
  return(
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world</h1>
        <p>
          Get access to all publications<br/>
          <span>for ${product.amount}/month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt="" />
    </main>
  )
};