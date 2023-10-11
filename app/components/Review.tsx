"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { useRouter } from "next/navigation";
import axios from "axios";
type Props = {
  productId?: number;
  userId?: number;
  onUpdateProductData?: () => void;
};

const Review = ({ productId, userId, onUpdateProductData }: Props) => {
  const router = useRouter();

  const [reviewForm, setReviewForm] = useState({
    star: 0,
    comment: "",
    productId: productId,
    userId: userId,
  });

  const onChange = (nextValue: number) => {
    setReviewForm((prevReviewForm) => ({ ...prevReviewForm, star: nextValue }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReviewForm((prevReviewForm) => ({
      ...prevReviewForm,
      [name]: value,
    }));
  };

  const postData = async () => {
    try {
      const response = await axios.post("/api/review", reviewForm);
      setReviewForm({
        star: 0,
        comment: "",
        productId: productId,
        userId: userId,
      });
      if (onUpdateProductData) {
        onUpdateProductData();
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (productId && userId) {
      setReviewForm((prevReviewForm) => ({
        ...prevReviewForm,
        productId: productId,
        userId: userId,
      }));
    }
  }, [productId, userId]);
  return (
    <div>
      <h1 className="text-xl font-medium mb-4">Give your opinions</h1>
      <h2 className="mb-2">Give Rating</h2>
      <ReactStars
        onChange={onChange}
        value={reviewForm.star}
        size={17}
        isEdit={true}
        activeColors={["gray", "orange", "#FFCE00", "#FF7800", "#FF0000"]}
      />
      <h2 className="mt-4">Write you comment here</h2>
      <div>
        <input
          className="border-[1px] border-[#c1aa93] rounded-lg w-full h-[40px] focus:border-[#766d64] outline-none px-2 mt-2"
          name="comment"
          onChange={handleChange}
          value={reviewForm.comment}
          type="text"
        />
      </div>
      <button
        className="px-5 p-2 border-[1px] bg-[#A4907C] text-white rounded-lg mt-5"
        onClick={postData}
      >
        Submit
      </button>
    </div>
  );
};

export default Review;
