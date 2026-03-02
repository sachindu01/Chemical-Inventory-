import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopConext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import jsPDF from "jspdf";

const Dashboard = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);

  const [requests, setRequests] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("No token found. Aborting data fetch.");
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        console.log("Fetched order data:", response.data.orders); // Log the fetched orders
        setRequests(response.data.orders.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    console.log("Updated requests state:", requests); // Log the requests state after updating
  }, [requests]);

  const handleButtonClick = (type, status, reqId) => {
    console.log(`Button clicked - Type: ${type}, Status: ${status}, Request ID: ${reqId}`);
    if (status === "accepted") {
      generatePDF(type, reqId);
    } else if (status === "declined" && type === "inventory") {
      navigate("/inventory");
    }
  };

  const generatePDF = (type, reqId) => {
    console.log("Generating PDF for Request ID:", reqId);
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4'
    });

    doc.setFont('helvetica', 'normal');

    if (type === "inventory") {
      const request = requests.find((req) => req._id === reqId);
      console.log("Request data for PDF:", request);

      if (request) {
        let y = 20;

        doc.text("Chemical Request", 20, y);
        y += 30;
        doc.text(`Requested by: ${request.userInfo.firstName} ${request.userInfo.lastName}`, 20, y);
        y += 30;
        doc.text(`Email: ${request.userInfo.email}`, 20, y);
        y += 30;
        doc.text(`Phone: ${request.userInfo.phone}`, 20, y);
        y += 30;

        doc.text(`Project: ${request.projectInfo.projectName}`, 20, y);
        y += 30;
        doc.text(`Description: ${request.projectInfo.projectDescription}`, 20, y);
        y += 30;
        doc.text(`Timeline: ${request.projectInfo.projectTimeline}`, 20, y);
        y += 30;

        doc.text("Items Requested:", 20, y);
        y += 30;
        request.items.forEach((item, index) => {
          console.log("Item:", item); // Log each item to inspect its details
          doc.text(`${item.name} x ${item.quantity}`, 20, y + index * 20);
        });
        y += request.items.length * 20;

        doc.text(`Request Date: ${new Date(request.date).toDateString()}`, 20, y);
        y += 30;

        if (request.issuedDate) {
          doc.text(`Issued Date: ${new Date(request.issuedDate).toDateString()}`, 20, y);
          y += 30;
        }
        if (request.returnedDate) {
          doc.text(`Returned Date: ${new Date(request.returnedDate).toDateString()}`, 20, y);
          y += 30;
        }

        doc.text(`Verification Key: ${request.verificationKey}`, 20, y);
        y += 60;

        doc.save(`inventory_request_${reqId}.pdf`);
      }
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY CHEMICAL"} text2={"REQUESTS"} />
      </div>

      <div>
        {requests.map((req, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-b border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-16 sm:w-20" src={assets.chemical_icon} alt="Parcel Icon" />
            <div>
              <div>
                {req.items.map((item, index) => (
                  <div className="flex items-center py-0.5" key={index}>
                    <p className="text-gray-700 mr-4">{item.name}</p>
                    <span className="font-bold"> : {item.quantity}{item.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p>Chemicals: {req.items.length}</p>
              <p>Date: {new Date(req.date).toDateString()}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                {req.status === "accepted" && (
                  <>
                    <div className="min-w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-sm md:text-base">Request Accepted</p>
                  </>
                )}
                {req.status === "declined" && (
                  <>
                    <div className="min-w-2 h-2 rounded-full bg-red-500"></div>
                    <p className="text-sm md:text-base">Request Declined</p>
                  </>
                )}
                {req.status === "pending" && (
                  <>
                    <div className="min-w-2 h-2 rounded-full bg-yellow-500"></div>
                    <p className="text-sm md:text-base">Pending</p>
                  </>
                )}
              </div>
            </div>

            <div>
              {req.status === "accepted" && (
                <button
                  className="border py-2 px-4 bg-blue-500 text-white font-medium rounded-sm"
                  onClick={() => handleButtonClick("inventory", "accepted", req._id)}
                >
                  Download PDF
                </button>
              )}
              {req.status === "declined" && (
                <button
                  className="border py-2 px-4 bg-red-500 text-white font-medium rounded-sm"
                  onClick={() => handleButtonClick("inventory", "declined", req._id)}
                >
                  Request Again
                </button>
              )}
              {req.status === "pending" && (
                <button
                  onClick={loadOrderData}
                  className="border py-2 px-4 text-sm font-medium rounded-sm"
                >
                  Track Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
