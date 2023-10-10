import NextAuth from "next-auth/next";
declare module "next-auth" {
  interface User {
    id: number;
    email: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}
