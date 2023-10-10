"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery";
import Info from "../Info";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const productId = params.id;
  const [productData, setProductData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/productdetail?id=${productId}`);

        setProductData(response.data);
        console.log("Product data:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId]);
  const urlString = productData?.images;
  return (
    <div className="max-w-[1280px] mx-auto px-5 py-5">
      <div className="font-semibold text-2xl mb-2">
        <a href="/">SHEIN</a>
      </div>
      <hr />
      {productData && (
        <div className="grid grid-cols-2 mt-10 gap-14">
          {urlString && <ImageGallery imageUrls={urlString} />}
          <Info {...productData} />
        </div>
      )}
    </div>
  );
};

export default Page;
