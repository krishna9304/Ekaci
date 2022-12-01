import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Claim_Images = () => {
  const { partData, setPartData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setPartData({ ...partData, [name]: e.target.files[0] });
    }
    setPartData({ ...partData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      {/* img1 */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Image 1
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["img1"] || ""}
          name="img1"
          type="file"
          accept="image/*"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
      {/* img2 */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Image 2
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["img_2"] || ""}
          name="img_2"
          type="file"
          accept="image/*"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
      {/* img3 */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Image 3
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["img_3"] || ""}
          name="img_3"
          type="file"
          accept="image/*"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
      {/* img4 */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Image 4
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["img_4"] || ""}
          name="img_4"
          type="file"
          accept="image/*"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
      {/* img5 */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Image 5
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["img_5"] || ""}
          name="img_5"
          type="file"
          accept="image/*"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

export default Claim_Images;
