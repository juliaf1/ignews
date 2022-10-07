import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
  }
};

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.id}`);
    }
  }, [session]);
  
  return(
    <>
      <Head>
        <title>{`${post.title} | ig.news` }</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.created_at}</time>
          <div
            className={`${styles.content} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: '1'
        }
      }
    ],
    fallback: 'blocking', // load post on server side before loading page
    // fallback: true // load page before loading post
    // fallback: false // render 404 if static page is not yet generated
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  // Request API/DB for post with that slug/id

  return {
    props: {
      post: {
        id,
        title: 'Creating a Next application with TS',
        content: '<p>In this guide, you will learn how to create a <a href="/">Next</a> application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.</p>',
        created_at: 'Sunday, October 02, 2022',
      }
    },
    redirect: 60 * 30, // 30 minutes
  }
};