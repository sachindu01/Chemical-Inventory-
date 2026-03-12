import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopConext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("-");
  const [locationImage, setLocationImage] = useState("");

  // Fetch product data and convert description to a list
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData({
          ...item,
          description: item.description.split(";"), // Splitting description into points
        });
        setImage(item.image[0]);
        setLocationImage(item.locationImage[0]);
        return null;
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Handle quantity and unit changes
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto object-cover"
              src={image}
              alt="Product"
            />
          </div>

          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto object-cover"
              src={locationImage}
              alt="Location"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium text-sm">
            {productData.availability && productData.quantity > 0 ? (
              <span className="text-green-600">IN STOCK</span>
            ) : (
              <span className="text-red-500">OUT OF STOCK</span>
            )}
          </p>

          {/* Description as List */}
          <div className="mt-5 mb-5 text-slate-600 md:w-4/5">
            <h3 className="font-semibold text-lg mb-3 text-slate-800 tracking-wide">Description:</h3>
            <ul className="list-disc ml-5">
              {productData.description.map((point, index) => (
                <li key={index}>{point.trim()}</li>
              ))}
            </ul>
          </div>

          <p className="mt-5 mb-5 text-gray-500 md:w-4/5">
            Available quantity: {productData.quantity}
            {productData.unit}
          </p>

          <p className="mt-5 mb-5 text-gray-500 md:w-4/5">
            Location: {productData.location}
          </p>

          {/* Quantity and Unit Selection */}
          <div className="flex gap-4 items-center mt-5">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border px-4 py-2 w-24 text-center"
              placeholder="Quantity"
            />
            <select
              value={unit}
              onChange={handleUnitChange}
              className="border px-4 py-2"
            >
              <option value="mg">mg</option>
              <option value="grams">g</option>
              <option value="ml">ml</option>
              <option value="L">L</option>
              <option value="-">-</option>
            </select>
          </div>

          <button
            onClick={() => addToCart(productData._id, quantity, unit)}
            className={`text-white px-8 py-3 text-sm mt-4 font-medium rounded shadow-sm tracking-wide transition-colors ${productData.quantity === 0
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
              }`}
            disabled={!productData.availability || productData.quantity === 0}
          >
            {productData.availability && productData.quantity > 0
              ? "ADD TO REQUEST"
              : "OUT OF STOCK"}
          </button>

          <hr className="mt-8 sm:w-4/5 border-slate-200" />
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
