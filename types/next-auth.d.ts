import NextAuth from "next-auth/next";
declare module "next-auth" {
  interface User {
    id: number;
    name?: string;
    email: string;
    picture?: string;
    role: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: string;
    } & DefaultSession["user"];
  }
}
