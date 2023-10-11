"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  images: string;
  store: string;
  price: number;
};

const Item = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("/api/allproduct");
        setProducts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <h1 className="py-3 text-xl">Clothing</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12">
        {isLoading ? (
          <h1 className="py-3 text-sm">Loading...</h1>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <Link href={`/productdetail/${product.id}`}>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Item;
