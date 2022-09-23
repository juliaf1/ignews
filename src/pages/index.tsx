import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { HomeBanner } from '../components/HomeBanner';
import { stripe } from '../services/stripe';

import styles from '../styles/home.module.scss';

export interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>

      <HomeBanner product={product} />
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async () => {
  // runs in a server side node env
  const price = await stripe.prices.retrieve('price_1Ll3UgC2rcl2xbfnWmNaR0PR', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  }

  return {
    props: {
      product
    }
  }
}