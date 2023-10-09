"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

type Props = {};

const Item = (props: Props) => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProduct = async () => {
    const res = await axios.get("http://localhost:3000/api/allproduct");
    setProducts(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <h1 className="py-3 text-xl">Clothing</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 ">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/dashboard/${product.id}`}>
              <div className="relative rounded-lg">
                <img
                  src={product.images.split(",")[0]}
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h1 className="text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                    {product.title}
                  </h1>
                  <p className="text-[13px] opacity-60">{product.store}</p>
                </div>
                <span className="px-2 font-medium bg-gray-100 rounded-lg">
                  &#3647;{product.price}.00
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
