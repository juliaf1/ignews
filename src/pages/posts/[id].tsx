import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
  }
};

export default function Post({ post }: PostProps) {
  return(
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>


    </>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { id } = params;

  // Request API/DB for post with that slug/id

  return {
    props: {
      post: {
        id,
        title: 'Creating a Next application with TS',
        content: 'In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.',
        created_at: 'Sunday, October 02, 2022',
      }
    }
  }
};