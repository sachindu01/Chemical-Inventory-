import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";
import { assets } from "../assets/admin_assets/assets";

const Fund = ({ token }) => {
  const [fundRequests, setFundRequests] = useState([]);
  const [filteredFundRequests, setFilteredFundRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const fetchAllFundRequests = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/fund/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setFundRequests(response.data.fundRequests.reverse());
        setFilteredFundRequests(response.data.fundRequests);
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
      const filtered = fundRequests.filter((req) =>
        req.verificationKey.includes(search)
      );
      setFilteredFundRequests(filtered);
    } else {
      setFilteredFundRequests(fundRequests); // Reset to all requests if no search
    }
  };

  // console.log(fundRequests);

  const statusHandler = async (event, reqId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        backendUrl + "/api/fund/status",
        { reqId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllFundRequests();
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllFundRequests();
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

  const handleIssued = async (reqId) => {
    const issuedDate = new Date().toISOString(); // Get the current date
    try {
      const response = await axios.post(
        backendUrl + "/api/fund/issue",
        { reqId, issuedDate },
        {
          headers: { token }, 
        }
      );
      if (response.data.success) {
        await fetchAllFundRequests(); 
        toast.success("Fund issued successfully!");
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
          <strong>Fund Requests Page</strong>
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
        {filteredFundRequests.map((req, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <div>
              <p className="font-medium">Leader: {req.leader}</p>
              <p>Team Members: {req.teamMembers.join(", ")}</p>
            </div>

            <div>
              <p className="font-medium">
                Project Title: {req.projectInfo.projectTitle}
              </p>
              <p>Type: {req.projectInfo.projectType}</p>
            </div>

            <div className="w-full">
              <>
                <p className="font-medium">Budget Details</p>
                <a
                  className="text-blue-600"
                  href={req.budgetDetails}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Budget
                </a>
              </>
              {/* Conditionally render issue date */}
              {req.issuedDate && (
                <p className="mt-7 text-sm text-gray-700">
                  <span className="font-semibold">Issued Date:</span>{" "}
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
                    className={`w-full px-4 py-2 text-white rounded ${req.issuedDate ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                    disabled={req.issuedDate} 
                    onClick={
                      req.issuedDate ? null : () => handleIssued(req._id)
                    }
                  >
                    ISSUED
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
              <div className="col-span-full bg-gray-50 p-4 mt-2 border-t-2">
                <p className="mt-4">
                  <strong> Project Info:</strong>
                  <p className="ml-4">
                    <span className="font-semibold">Description:</span>{" "}
                    {req.projectInfo.projectDescription}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Starting Date:</span>{" "}
                    {new Date(
                      req.projectInfo.startingDate
                    ).toLocaleDateString()}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Completion Date:</span>
                    {new Date(
                      req.projectInfo.completionDate
                    ).toLocaleDateString()}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Goal:</span>{" "}
                    {req.projectInfo.goal}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Risks:</span>{" "}
                    {req.projectInfo.risks}
                  </p>
                </p>

                <p className="mt-4">
                  <strong> Contact Info:</strong>
                  <p className="ml-4">
                    <span className="font-semibold">Email:</span>{" "}
                    {req.contactInfo.email}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Phone:</span>{" "}
                    {req.contactInfo.phone}
                  </p>
                </p>

                <p className="mt-4">
                  <strong>Supervisor:</strong>
                  <p className="ml-4">
                    <span className="font-semibold">Name:</span>{" "}
                    {req.supervisor.name}
                  </p>
                  <p className="ml-4">
                    <span className="font-semibold">Email:</span>{" "}
                    {req.supervisor.email}
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

export default Fund;
