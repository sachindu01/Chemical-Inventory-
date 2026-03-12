import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopConext";
import axios from 'axios';
import { toast } from "react-toastify";

const PlaceInventoryReq = () => {
  const { navigate, backendUrl, token, cartItems, products, setCartItems } =
    useContext(ShopContext);

  const [userInfo, setuserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [projectInfo, setprojectInfo] = useState({
    projectName: "",
    projectDescription: "",
    projectTimeline: "",
  });

  const onChangeHandlerUser = (event) => {
    const { name, value } = event.target;

    setuserInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const onChangeHandlerProject = (event) => {
    const { name, value } = event.target;

    setprojectInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log("Cart Items:", cartItems);
  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      console.log("Cart Items:", cartItems); // Check contents of cartItems
      console.log("Available Products:", products); // Check available products

      for (const itemId in cartItems) {
        const itemInfo = products.find((product) => product._id === itemId); // Find product based on itemId
        if (itemInfo) {
          const clonedItem = structuredClone(itemInfo);
          clonedItem.quantity = cartItems[itemId].quantity; // Access quantity from the nested object
          clonedItem.unit = cartItems[itemId].unit; // Access unit from the nested object
          orderItems.push(clonedItem);
        }
      }

      console.log("Order Data", orderItems); // Log orderItems after loop

      let orderData = {
        items: orderItems,
        userInfo,
        projectInfo,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.success) {
        setCartItems({});
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error); // Log any errors
    }
  };

  return (
    <form
      onSubmit={OnSubmitHandler}
      className="flex flex-col gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Container for Contact and Project Information */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
        {/* Left side - Contact Information */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[600px]">
          <div className="text-xl sm:text-2xl my-3 text-slate-800">
            <Title text1={"CONTACT"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandlerUser}
              name="firstName"
              value={userInfo.firstName}
              className="border border-slate-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandlerUser}
              name="lastName"
              value={userInfo.lastName}
              className="border border-slate-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            onChange={onChangeHandlerUser}
            name="email"
            value={userInfo.email}
            className="border border-slate-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandlerUser}
            name="phone"
            value={userInfo.phone}
            className="border border-slate-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* Right side - Project Information */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[600px]">
          <div className="text-xl sm:text-2xl my-3 text-slate-800">
            <Title text1={"PROJECT"} text2={"INFORMATION"} />
          </div>
          <input
            required
            onChange={onChangeHandlerProject}
            name="projectName"
            value={projectInfo.projectName}
            className="border border-slate-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            type="text"
            placeholder="Project name"
          />
          <textarea
            required
            onChange={onChangeHandlerProject}
            name="projectDescription"
            value={projectInfo.projectDescription}
            className="border border-slate-300 rounded py-2 px-3.5 w-full h-32 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            placeholder="Project description"
          />

          <input
            required
            onChange={onChangeHandlerProject}
            name="projectTimeline"
            value={projectInfo.projectTimeline}
            className="border border-slate-300 rounded py-2 px-3.5 w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            type="text"
            placeholder="Timeline (e.g., 3 months)"
          />
        </div>
      </div>

      <div className="flex justify-center w-full mt-8">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 transition-colors text-white py-3 px-16 text-sm font-medium rounded shadow-sm"
        >
          Request Items
        </button>
      </div>
    </form>
  );
};

export default PlaceInventoryReq;
