"use client";
import React, { useState } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
const Productform = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    style: "",
    size: "",
    inventory: 0,
    color: "",
    price: 0,
    images: "",
    userId: id,
    store: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <div>
        <Navbar />
      </div>
      <h1 className="text-3xl font-semibold py-6">Add your Product n SEINE</h1>
      <div className="text-black mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              className="w-full h-[50px] bordor-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productform;
