import React, { useContext, useState } from "react";
import Stepper from "./stepper";
import Button from "./submitButton";
import ApplicationForm from "./form";
import "./RequestFunds.css";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { ShopContext } from "../../context/ShopConext";
import axios from "axios";

const RequestFunds = () => {
  const steps = ["Contact Information", "About the Project", "Approval"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { backendUrl, token } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    leader: "",
    teamMembers: [],
    contactInfo: {
      email: "",
      phone: "",
    },
    projectInfo: {
      projectTitle: "",
      projectDescription: "",
      goal: "",
      risks: "",
      projectType: "",
      startingDate: "",
      completionDate: "",
    },
    supervisor: {
      name: "",
      email: "",
    },
    budgetDetails: null,
    isChecked: false,
  });

  const validateStep = () => {
    let validationErrors = {};

    if (currentStep === 1) {
      if (!formData.leader) validationErrors.leader = "Leader name is required";

      const hasTeamMember = formData.teamMembers.some(
        (member) => member.trim() !== ""
      );
      if (!hasTeamMember)
        validationErrors.teamMembers =
          "At least one team member's name is required";

      // Email validation
      if (!formData.contactInfo.email) {
        validationErrors.email = "Email is required";
      } else {
        if (!isEmail(formData.contactInfo.email)) {
          validationErrors.email = "Enter a valid email address";
        }
      }

      // Phone number validation (must be 10 digits)
      if (!formData.contactInfo.phone) {
        validationErrors.phone = "Phone number is required";
      } else if (
        formData.contactInfo.phone.length !== 10 ||
        !/^\d+$/.test(formData.contactInfo.phone)
      ) {
        validationErrors.phone = "Phone number must be a 10-digit number";
      }
    }

    if (currentStep === 2) {
      if (!formData.projectInfo.projectTitle)
        validationErrors.projectTitle = "Project title is required";
      if (!formData.projectInfo.projectDescription)
        validationErrors.projectDescription = "Project description is required";
      if (!formData.projectInfo.startingDate)
        validationErrors.startingDate = "Starting date is required";
      if (!formData.budgetDetails)
        validationErrors.budgetDetails = "Budget report is required";
      if (!formData.isChecked)
        validationErrors.isChecked = "Confirmation checkbox must be checked";
    }

    if (currentStep === 3) {
      if (!formData.supervisor.name)
        validationErrors.supervisorName = "Supervisor name is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleButtonClick = () => {
    if (!validateStep()) return;

    if (currentStep === steps.length) {
      setComplete(true);

       

      // Submit the form
      submitFormData();

      navigate("/dashboard");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleFormDataChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitFormData = async () => {
    const formDataToSend = new FormData();
// Append individual form fields
formDataToSend.append("leader", formData.leader);

// Handle teamMembers array
formData.teamMembers.forEach((member, index) => {
  formDataToSend.append(`teamMembers[${index}]`, member);
});

// Handle contactInfo object
formDataToSend.append("contactInfo[email]", formData.contactInfo.email);
formDataToSend.append("contactInfo[phone]", formData.contactInfo.phone);

// Handle projectInfo object
formDataToSend.append("projectInfo[projectTitle]", formData.projectInfo.projectTitle);
formDataToSend.append("projectInfo[projectDescription]", formData.projectInfo.projectDescription);
formDataToSend.append("projectInfo[goal]", formData.projectInfo.goal);
formDataToSend.append("projectInfo[risks]", formData.projectInfo.risks);
formDataToSend.append("projectInfo[projectType]", formData.projectInfo.projectType);
formDataToSend.append("projectInfo[startingDate]", formData.projectInfo.startingDate);
formDataToSend.append("projectInfo[completionDate]", formData.projectInfo.completionDate);

// Handle supervisor object
formDataToSend.append("supervisor[name]", formData.supervisor.name);
formDataToSend.append("supervisor[email]", formData.supervisor.email);


formDataToSend.append("budgetDetails", formData.budgetDetails);


    try {

      
      const response = await axios.post(
        backendUrl + "/api/fund/place",
        formDataToSend,
        { headers: { token } }
      );

      if (response.data.success) {
        console.log("Fund request submitted successfully");
      } else {
        console.log("Failed to submit the request", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bodyContainer">
      <p className="application-form-title">Application Form</p>
      <div className="stepperContainer">
        <Stepper currentStep={currentStep} steps={steps} complete={complete} />
      </div>
      <div className="formContainer">
        <ApplicationForm
          currentStep={currentStep}
          onFormDataChange={handleFormDataChange}
          formData={formData}
          errors={errors}
        />
      </div>
      {!complete && (
        <div className="buttonContainer">
          <Button onClick={handleButtonClick}>
            {currentStep === steps.length ? "Submit" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestFunds;
