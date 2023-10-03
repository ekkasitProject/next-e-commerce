import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
interface Props {
  info: string;
  setInfo: React.Dispatch<React.SetStateAction<any>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<Props> = ({
  info,
  setInfo,
  imageUrls,
  setImageUrls,
  handleImageChange,
}) => {
  const onupload = (result: any) => {
    setInfo(result.info.secure_url);
    const newImageUrl = result.info.secure_url;
    setImageUrls((prevImageUrls) => {
      return [...prevImageUrls, newImageUrl];
    });
    handleImageChange(result);
  };
  const handleDeleteImage = (index: number) => {
    setImageUrls((prevImageUrls) => {
      return prevImageUrls.filter((_, i) => i != index);
    });
  };
  return (
    <div>
      <div className="mb-10">
        <CldUploadWidget uploadPreset="u87eo5yv" onUpload={onupload}>
          {({ open }: any) => {
            function handleonClick(e: React.MouseEvent<HTMLButtonElement>) {
              e.preventDefault();
              open();
            }
            return (
              <>
                <button
                  className="border-[1px] rounded-lg p-1 px-2"
                  onClick={handleonClick}
                >
                  Upload Product Images
                </button>
              </>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {imageUrls.map((imageUrl, index) => {
          return (
            <div key={index} className="flex flex-col justify-center">
              <img
                src={imageUrl}
                className="w-[250px] h-[300px] object-cover object-top"
                alt={`uploades Image ${index + 1}`}
              />
              <button
                className="border-[1px] rounded-lg p-1 px-2 mt-5 "
                onClick={() => handleDeleteImage(index)}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageUpload;
