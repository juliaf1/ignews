import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: 'read:user' },
      },
    }),
    // add more authentication providers as necessary
  ],
  jwt: {
    secret: process.env.SIGNIN_KEY,
  },
  callbacks: {
    async signIn({ user }) {
      const { email } = user;

      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        );

        return true;
      } catch (error) {
        const { description } = error;
        return description.includes('is not unique');
      };
    },
  }
});