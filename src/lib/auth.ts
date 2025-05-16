import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // This is where you would typically fetch the user from your database
        // For demo purposes, we'll use a mock user
        const mockUser = {
          id: "1",
          email: "demo@example.com",
          name: "Demo User",
          password: await bcrypt.hash("password123", 10),
        };

        const isValid = await bcrypt.compare(
          credentials.password,
          mockUser.password
        );

        if (isValid) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
