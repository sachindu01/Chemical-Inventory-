import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopConext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const item in cartItems) {
        if (cartItems[item].quantity > 0) {
          tempData.push({
            _id: item,
            quantity: cartItems[item].quantity,
            unit: cartItems[item].unit,  // Include the unit
          });
        }
      }
      setCartData(tempData);
      console.log("Mapped Cart Data:", tempData); // Log mapped cart data
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"REQUEST BASKET"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          console.log("Product Data for Cart Item:", productData); // Log each product data

          if (!productData) {
            console.warn(`Product not found for cart item ID: ${item._id}`);
            return null; // Skip rendering if product data is not found
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b border-slate-200 text-slate-700 grid grid-cols-3 items-center gap-4 hover:bg-slate-50 transition"
            >
              {/* Product Details */}
              <div className="flex items-start gap-6 col-span-1">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium text-slate-800">
                    {productData.name}
                  </p>
                </div>
              </div>
              {/* Quantity Input */}
              <div className="flex items-center justify-center">
                <input
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, Number(e.target.value), item.unit)
                  }
                  className="border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-white"
                  type="number"
                  min={1}
                  max={productData.quantity}
                />
                {/* Adjusted margin to bring unit closer */}
                <span className="ml-2 text-slate-600 font-medium">{item.unit}</span> {/* Display unit */}
              </div>
              {/* Bin Icon */}
              <div className="flex items-center justify-between col-span-1">
                <img
                  onClick={() => updateQuantity(item._id, 0)}
                  className="w-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />

              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-20">
        <div className="w-full text-center">
          <button
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/inventory-form");
                console.log("Cart Data:", cartData); // Log cart data
              } else {
                toast.error("No chemicals in Request Basket");
                return;
              }
            }}
            className="bg-teal-600 hover:bg-teal-700 transition duration-200 text-white text-sm font-medium my-8 px-8 py-3 rounded shadow-sm tracking-wide"
          >
            PROCEED TO REQUEST
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
