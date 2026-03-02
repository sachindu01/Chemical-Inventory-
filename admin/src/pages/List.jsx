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
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Quantity</b>
          <b>Unit</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((product, index) => (
          <div key={index} className="border-b pb-2">
            <div
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img className="w-12" src={product.image[0]} alt="" />
              <p>{product.name}</p>
              
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
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
              <div className="flex justify-center items-center">
                <img
                  onClick={() => removeProduct(product._id)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
                <button
                  onClick={() => toggleDetails(index)}
                  className="text-blue-500 underline"
                >
                  {product.showDetails ? "Hide Details" : "More Details"}
                </button>
              </div>
            </div>
            {product.showDetails && (
              <div className="bg-gray-100 p-3 text-sm rounded-md">
                <p>
                  <b>Category:</b> {product.category}
                </p>
                <p>
                  <b>Sub Category:</b> {product.subCategory}
                </p>
                <p>
                  <b>Location:</b> {product.location}
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
