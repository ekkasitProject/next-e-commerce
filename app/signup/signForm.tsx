"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
type Props = {};

const SignForm = (props: Props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const RegisterHandler = () => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    axios
      .post("api/register", data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
      .finally(() => router.push("/signin"));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-xl font-medium mb-4">Sign Up</h1>
        <label htmlFor="" className="mb-2">
          Name
        </label>
        <input
          type="text"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="name"
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
        />
        <label htmlFor="" className="mb-2">
          Email
        </label>
        <input
          type="email"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
        <label htmlFor="" className="mb-2">
          Password
        </label>
        <input
          type="password"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />
        <button
          onClick={RegisterHandler}
          className="p-2 border bg-[#A4907C] text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600"
        >
          Register Now
        </button>
        <Link
          href="/signin"
          className="text-sm text-center mt-5 text-neutral-600"
        >
          Already have an Account?
        </Link>
        <Link href="/" className="text-center mt-2">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SignForm;
