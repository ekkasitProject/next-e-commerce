import React, { useState } from "react";

interface ParaProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}
const Size: React.FC<ParaProps> = ({ setFormData }) => {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const sizes = ["sm", "md", "xl", "2xl", "3xl", "4xl"];

  const handleSizeButton = (size: string) => {
    setSelectedSize((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        // สอบเงื่อนไข, ถ้า prevSelectedSizes มีขนาดที่ถูกคลิกไว้แล้ว
        // (ถูกใส่ใน selectedSize) เราจะใช้ filter ในการลบขนาดนั้นออกจาก selectedSize.
        return prevSelectedSizes.filter((s) => s != size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  };
  const handleSubmit = () => {
    setFormData((prevFormData: FormData) => {
      return {
        ...prevFormData,
        size: selectedSize.join(","),
      };
    });
  };
  return (
    <div>
      {sizes.map((size) => {
        return (
          <button
            key={size}
            className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer px-3 mt-4 mb-5 mr-5 ${
              selectedSize.includes(size) ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => handleSizeButton(size)}
          >
            {size}
          </button>
        );
      })}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Size;
