import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from "react-toastify";


const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [locationImage1, setLocationImage1] = useState(false);
  const [locationImage2, setLocationImage2] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [location, setLocation] = useState("");

  
  const subCategoryOptions = {
    Organic: [
    "Alkanes",
    "Alkenes",
    "Alkynes",
    "Alcohols",
    "Ethers",
    "Amines",
    "Amino Acids",
    "Carboxylic Acids",
    "Esters",
    "Ketones",
    "Aldehydes",
    "Nitriles",
    "Phenols",
    "Polymers",
    "Aromatic Compounds"
  ],
  Inorganic: [
    "Acid",
    "Base",
    "Salt",
    "Oxide",
    "Hydroxide",
    "Sulfide",
    "Phosphate",
    "Nitrate",
    "Halide",
    "Carbonate",
    "Silicate",
    "Metal",
    "Non-Metal",
    "Other"
  ],
    
  };
  const unitOptions = ["g", "kg", "L", "mL", "units"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("availability", "true");
      formData.append("unit", unit);
      formData.append("location", location);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      locationImage1 && formData.append("locationImage1", locationImage1);
      locationImage2 && formData.append("locationImage2", locationImage2);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setLocationImage1(false);
        setLocationImage2(false);
        setQuantity('');
        setUnit('');
        setCategory('');
        setSubCategory('');
        setLocation('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full item-start gap-3">
      {/* Image Upload */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20 cursor-pointer"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                onChange={(e) => {
                  if (index === 0) setImage1(e.target.files[0]);
                  else if (index === 1) setImage2(e.target.files[0]);
                  else if (index === 2) setImage3(e.target.files[0]);
                  else if (index === 3) setImage4(e.target.files[0]);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Location Images */}
      <div>
        <p className="mb-2">Upload Location Images</p>
        <div className="flex gap-2">
          {[locationImage1, locationImage2].map((img, index) => (
            <label key={index} htmlFor={`locationImage${index + 1}`}>
              <img
                className="w-20 cursor-pointer"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                onChange={(e) => {
                  if (index === 0) setLocationImage1(e.target.files[0]);
                  else if (index === 1) setLocationImage2(e.target.files[0]);
                }}
                type="file"
                id={`locationImage${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Location</p>
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Product Category and Subcategory */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Organic">Organic</option>
            <option value="Inorganic">Inorganic</option>
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div>
          <p className="mb-2">Product Sub Category</p>
          <select className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="">Select Sub Category</option>
            {category &&
              subCategoryOptions[category].map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p className="mb-2">Quantity</p>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="1"
            min="1"
            required
          />
        </div>

        {/* Unit Dropdown */}
        <div>
          <p className="mb-2">Unit</p>
          <select className="w-full px-3 py-2"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="">Select Unit</option>
            {unitOptions.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
