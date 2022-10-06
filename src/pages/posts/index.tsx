import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Post {
  id: string;
  url: string;
  title: string;
  excerpt: string;
  created_at: string;
};

interface PostsProps {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
              <Link href={post.url} key={post.id}>
                <a>
                  <time>{post.created_at}</time>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
          )) }
        </div>
      </main>
    </>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  let url = '/posts'
  return {
    props: {
      posts: [
        { id: '1', url: `${url}/1`, title: 'Creating a Next application with TS', excerpt: 'In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.', created_at: 'March 22, 2022'},
        { id: '2', url: `${url}/2`, title: 'Creating a Next application with TS', excerpt: 'In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.', created_at: 'March 22, 2022'},
        { id: '3', url: `${url}/3`, title: 'Creating a Next application with TS', excerpt: 'In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.', created_at: 'March 22, 2022'},
      ]
    }
  }
};