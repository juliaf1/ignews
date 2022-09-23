import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { HomeBanner } from '../components/HomeBanner';

import styles from '../styles/home.module.scss';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>

      <HomeBanner />
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async () => {
  // runs in a server side node env
  return {
    props: {
      price: '9.9',
    }
  }
}