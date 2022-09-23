import Head from 'next/head';

import { HomeBanner } from '../components/HomeBanner';

import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>

      <HomeBanner />
    </>
  )
}
