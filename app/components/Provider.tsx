"use client";

// รับ session ฝั่ง client
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
type Props = {
  children: ReactNode;
};

const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
