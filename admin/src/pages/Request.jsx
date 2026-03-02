import React from "react";
import { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";

const Request = ({ token }) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setRequests(response.data.orders.reverse());
        setFilteredRequests(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  // Filter function to apply search
  const applyFilter = () => {
    if (search) {
      const filtered = requests.filter((req) =>
        req.verificationKey.includes(search)
      );
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests); // Reset to all requests if no search
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value; // Get the new status from the event

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  useEffect(() => {
    applyFilter();
  }, [search]);

  const toggleDetails = (requestId) => {
    if (expandedRequest === requestId) {
      setExpandedRequest(null); // Collapse if already expanded
    } else {
      setExpandedRequest(requestId); // Expand the current request
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible((prev) => !prev); // Toggle search bar visibility
  };

  // console.log(requests);

  const handleIssued = async (reqId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/issue",
        { reqId },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Items issued!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handleReturned = async (reqId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/return",
        { reqId },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Items returned!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="flex-grow">
          <strong>Chemical Requests Page</strong>
        </h3>

        <button
          onClick={toggleSearchBar}
          className="mb-4 px-4 py-2 flex items-center relative group bg-gray-500 rounded text-white hover:bg-gray-600"
        >
          <span className="mr-2">
            {" "}
            <img className="w-4" src={assets.search_icon} alt="" />
          </span>
          <span className="mr-2">Search</span>
        </button>
      </div>

      {/* Conditionally render the search bar */}
      {isSearchVisible && <SearchBar search={search} setSearch={setSearch} />}
      <div>
        {filteredRequests.map((req, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {req.items.map((item, index) => {
                  return (
                    <p className="py-0.5" key={index}>
                      •{item.name} : {item.quantity}{item.unit}{" "}
                    </p>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-medium">
                {req.userInfo.firstName + " " + req.userInfo.lastName}
              </p>
              <p>{req.userInfo.phone}</p>
            </div>

            <div className="w-full">
              <>
                <p>No. of Chemicals: {req.items.length}</p>
                <p>Date: {new Date(req.date).toLocaleDateString()}</p>
              </>

              {/* Conditionally render issue date */}
              {req.issuedDate && (
                <p className="mt-7 text-sm text-gray-700">
                  <span className="font-semibold">Issued Date:</span>{" "}
                  {new Date(req.issuedDate).toLocaleDateString()}
                </p>
              )}

              {/* Conditionally render returned date */}
              {req.returnedDate && (
                <p className="mt-7 text-sm text-gray-700">
                  <span className="font-semibold">Restored Date:</span>{" "}
                  {new Date(req.issuedDate).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="w-full">
              <select
                value={req.status}
                className="w-full p-2 font-semibold border rounded"
                onChange={(e) => statusHandler(e, req._id)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>

              {/* Conditionally render buttons when status is "accepted" */}
              {req.status === "accepted" && (
                <div className="mt-5 flex flex-col space-y-2">
                  <button
                    className={`w-full px-4 py-2 text-white rounded ${
                      req.issuedDate
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={req.issuedDate}
                    onClick={
                      req.issuedDate ? null : () => handleIssued(req._id)
                    }
                  >
                    ISSUED
                  </button>

                  <button
                    className={`w-full px-4 py-2 text-white rounded ${
                      req.returnedDate
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={req.returnedDate}
                    onClick={
                      req.returnedDate ? null : () => handleReturned(req._id)
                    }
                  >
                    RESTORED
                  </button>
                </div>
              )}
            </div>

            <button
              className="text-blue-500 underline"
              onClick={() => toggleDetails(req._id)}
            >
              {expandedRequest === req._id ? "Hide Details" : "Show Details"}
            </button>

            {expandedRequest === req._id && (
              <div className="col-span-full bg-amber-100 p-4 mt-2 border-t-2">
                <p className="mt-4">
                  <strong> Project Info:</strong>
                  <p className="ml-4">
                    <span className="font-semibold">Name:</span>{" "}
                    {req.projectInfo.projectName}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Description:</span>{" "}
                    {req.projectInfo.projectDescription}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Timeline:</span>{" "}
                    {req.projectInfo.projectTimeline}
                  </p>
                </p>

                <p className="mt-4">
                  <strong> Contact Info:</strong>
                  <p className="ml-4">
                    <span className="font-semibold">Email:</span>{" "}
                    {req.userInfo.email}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Phone:</span>{" "}
                    {req.userInfo.phone}
                  </p>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
