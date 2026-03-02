import React from "react";
import ContactInfo from "./contactInfo";
import AboutProjetc from "./aboutProject";
import Approval from "./approval";
import "./form.css";

const ApplicationForm = ({
  currentStep,
  onFormDataChange,
  formData,
  errors,
}) => {
  return (
    <div>
      {currentStep === 1 && (
        <div>
          <ContactInfo
            onFormDataChange={onFormDataChange}
            formData={formData}
            errors={errors}
          />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <AboutProjetc
            onFormDataChange={onFormDataChange}
            formData={formData}
            errors={errors}
          />
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <Approval
            onFormDataChange={onFormDataChange}
            formData={formData}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
