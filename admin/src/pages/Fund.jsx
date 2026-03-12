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
        <h3 className="flex-grow text-xl font-bold text-slate-800 tracking-wide">
          Fund Requests Page
        </h3>

        <button
          onClick={toggleSearchBar}
          className="mb-4 px-4 py-2 flex items-center relative group bg-slate-600 rounded text-white hover:bg-slate-700 transition shadow-sm font-medium tracking-wide"
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
            className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr] gap-4 items-start border border-slate-200 bg-white shadow-sm rounded-lg p-5 md:p-6 my-4 text-xs sm:text-sm text-slate-700 hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-slate-800">Leader: {req.leader}</p>
              <p className="mt-1">Team Members: {req.teamMembers.join(", ")}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Project Title: {req.projectInfo.projectTitle}
              </p>
              <p className="mt-1">Type: {req.projectInfo.projectType}</p>
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
                className="w-full p-2 font-medium border border-slate-300 rounded text-slate-700 outline-none focus:ring-1 focus:ring-teal-500"
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
                    className={`w-full px-4 py-2 text-white font-medium rounded transition tracking-wide ${req.issuedDate ? "bg-slate-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 shadow-sm"}`}
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
              className="text-teal-600 font-medium hover:text-teal-800 transition underline-offset-2 underline"
              onClick={() => toggleDetails(req._id)}
            >
              {expandedRequest === req._id ? "Hide Details" : "Show Details"}
            </button>

            {expandedRequest === req._id && (
              <div className="col-span-full bg-slate-50 p-4 mt-2 border border-slate-200 rounded-md shadow-inner text-slate-700">
                <div className="mt-2">
                  <strong className="text-slate-800">Project Info:</strong>
                  <div className="ml-4 mt-1 space-y-1">
                    <p>
                      <span className="font-semibold text-slate-800">Description:</span>{" "}
                      {req.projectInfo.projectDescription}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Starting Date:</span>{" "}
                      {new Date(
                        req.projectInfo.startingDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Completion Date:</span>{" "}
                      {new Date(
                        req.projectInfo.completionDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Goal:</span>{" "}
                      {req.projectInfo.goal}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Risks:</span>{" "}
                      {req.projectInfo.risks}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <strong className="text-slate-800">Contact Info:</strong>
                  <div className="ml-4 mt-1 space-y-1">
                    <p>
                      <span className="font-semibold text-slate-800">Email:</span>{" "}
                      {req.contactInfo.email}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Phone:</span>{" "}
                      {req.contactInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <strong className="text-slate-800">Supervisor:</strong>
                  <div className="ml-4 mt-1 space-y-1">
                    <p>
                      <span className="font-semibold text-slate-800">Name:</span>{" "}
                      {req.supervisor.name}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Email:</span>{" "}
                      {req.supervisor.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fund;
