import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const userExists = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!userExists) {
          return null;
        }

        const passwordMatch = await compare(
          credentials?.password,
          userExists.password
        );

        if (!passwordMatch) {
          return null;
        }

        console.log({
          id: userExists.id,
          email: userExists.email,
          password: userExists.password,
        });

        return {
          id: userExists.id,
          email: userExists.email,
          password: userExists.password,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
