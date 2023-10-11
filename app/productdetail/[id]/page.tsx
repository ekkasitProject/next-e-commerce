"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery";
import Info from "../Info";
import Review from "../../components/Review";
import ReviewSection from "../ReviewSection";
import { fetchData } from "next-auth/client/_utils";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const productId = params.id;
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/productdetail?id=${productId}`);
      setProductData(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setIsLoading(false);
    }
  };

  const updateProductData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const urlString = productData?.product.images;
  return (
    <div className="max-w-[1280px] mx-auto px-5 py-5">
      <div className="font-semibold text-2xl mb-2">
        <a href="/">SHEIN</a>
      </div>
      <hr />
      {productData && (
        <div className="grid grid-cols-2 mt-10 gap-14">
          {urlString && <ImageGallery imageUrls={urlString} />}
          <Info
            {...productData.product}
            rating={() => productData.averageRating}
            numbercomments={productData.allReviews.length}
          />
        </div>
      )}
      <div className="mb-20 mt-20">
        <div className="flex items-center space-x-5 mb-10">
          <span className="w-[5px] h-[30px] bg-[#A4907C] rounded-full inline-block"></span>
          <span className="font-medium text-xl">Product Description</span>
        </div>
        {productData && (
          <div className="grid grid-cols-2">
            <div className="fles flex-col justify-center">
              <div className="grid grid-cols-3 gap-5 mb-5">
                <div>
                  <h3 className="font-medium">Category</h3>
                  <p className="text-sm text-[#A4907C]">
                    {productData.product.category}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Dress Style</h3>
                  <p className="text-sm text-[#A4907C]">
                    {productData.product.style}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Store</h3>
                  <p className="text-sm text-[#A4907C]">
                    {productData.product.store}
                  </p>
                </div>
              </div>
              <div
                style={{
                  borderColor: `{${productData.product.color
                    .split(",")
                    .pop()}}`,
                }}
                className={`leading-6 text-sm text-neutral-700 h-[200px] border-[1px] rounded-md p-4 overflow-scroll no-scrollbar`}
                dangerouslySetInnerHTML={{
                  __html: productData?.product.description,
                }}
              ></div>
            </div>
            <div className="flex justify-end relative items-center">
              <img
                src={productData.product.images.split(",").pop()}
                className="max-h-[300px] w-10/12 rounded-lg object-cover"
                alt=""
              />
              <span className="text-sm absolute bottom-2 right-2 text-white font-medium">
                {productData.title}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 mb-20">
        <div className="flex items-center space-x-5 mb-10">
          <span className="w-[5px] h-[30px] bg-[#A4907C] rounded-full inline-block"></span>
          <span className="font-medium text-xl">Comment & Review Section</span>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <div>
              {productData?.allReviews.map((review: any, index: number) => (
                <div key={review.id} className="mb-5">
                  <h1 className="mb-2 font-medium">Comment: {index + 1}</h1>
                  <ReviewSection {...review} />
                </div>
              ))}
            </div>
          </div>
          <Review
            productId={productData?.product.id}
            userId={productData?.product.userId}
            onUpdateProductData={updateProductData}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
