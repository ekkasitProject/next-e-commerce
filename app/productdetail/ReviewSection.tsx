"use client";
import React from "react";
import ReactStars from "react-rating-star-with-type";
type Props = {
  rating: number;
  commentry: string;
  prodcutId: number;
  userId: number;
};

const ReviewSection = ({ rating, commentry, prodcutId, userId }: Props) => {
  return (
    <div>
      <ReactStars
        value={rating}
        isEdit={false}
        activeColors={["gray", "orange", "#FFCE00", "#FF7800", "#FF0000"]}
      />
      <p className="mt-2">{commentry}</p>
    </div>
  );
};

export default ReviewSection;
