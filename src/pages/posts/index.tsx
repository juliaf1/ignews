import Head from 'next/head';

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de março, 2022</time>
            <h3>Creating a Next application with TS</h3>
            <p>In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.</p>
          </a>

          <a>
            <time>12 de março, 2022</time>
            <h3>Creating a Next application with TS</h3>
            <p>In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.</p>
          </a>

          <a>
            <time>12 de março, 2022</time>
            <h3>Creating a Next application with TS</h3>
            <p>In this guide, you will learn how to create a Next application with TypeScript from scratch... Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.</p>
          </a>
        </div>
      </main>
    </>
  )
};