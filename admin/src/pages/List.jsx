import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        const productsWithDetailsState = response.data.products.map((product) => ({
          ...product,
          showDetails: false, // Add a property to track details visibility
        }));
        setList(productsWithDetailsState);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleDetails = (index) => {
    setList((prevList) =>
      prevList.map((product, i) =>
        i === index ? { ...product, showDetails: !product.showDetails } : product
      )
    );
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        { productId: id, quantity },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-2 px-4 border border-slate-200 bg-slate-50 text-slate-700 text-sm font-semibold tracking-wide rounded-t-md">
          <span>Image</span>
          <span>Name</span>
          <span>Quantity</span>
          <span>Unit</span>
          <span className="text-center">Action</span>
        </div>
        {list.map((product, index) => (
          <div key={index} className="border-b pb-2">
            <div
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-slate-200 border-t-0 text-slate-600 text-sm bg-white hover:bg-slate-50 transition"
            >
              <img className="w-12 h-12 object-cover rounded shadow-sm" src={product.image[0]} alt="" />
              <p className="font-medium text-slate-800">{product.name}</p>

              <input
                className="border border-slate-300 rounded max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 outline-none focus:ring-1 focus:ring-teal-500"
                type="number"
                value={product.quantity}
                min={0}
                onChange={(e) =>
                  e.target.value === ""
                    ? null
                    : updateQuantity(product._id, Number(e.target.value))
                }
              />
              <div>
                <p>{product.unit}</p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <img
                  onClick={() => removeProduct(product._id)}
                  className="w-4 sm:w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
                  src={assets.bin_icon}
                  alt=""
                />
                <button
                  onClick={() => toggleDetails(index)}
                  className="text-teal-600 hover:text-teal-800 font-medium transition"
                >
                  {product.showDetails ? "Hide Details" : "More Details"}
                </button>
              </div>
            </div>
            {product.showDetails && (
              <div className="bg-slate-50 border border-slate-200 border-t-0 p-4 text-sm text-slate-600 shadow-inner rounded-b-md">
                <p className="mb-1">
                  <span className="font-semibold text-slate-800">Category:</span> {product.category}
                </p>
                <p className="mb-1">
                  <span className="font-semibold text-slate-800">Sub Category:</span> {product.subCategory}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Location:</span> {product.location}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
