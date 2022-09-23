import styles from './styles.module.scss';

export function HomeBanner() {
  return(
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world</h1>
        <p>
          Get access to all publications<br/>
          <span>for $9.9/month</span>
        </p>
      </section>

      <img src="/images/avatar.svg" alt="" />
    </main>
  )
};