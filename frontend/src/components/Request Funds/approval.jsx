import React from "react";

const Approval = ({ onFormDataChange, formData, errors }) => {
  // Handle change for supervisor inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the supervisor field in formData
    onFormDataChange({
      supervisor: { ...formData.supervisor, [name]: value },
    });
  };

  return (
    <div className="formSection">
      <p className="contact-info-title">Approval of the Project</p>

      <p className="contact-info-lecturer">
        Information about the Lecture In-charge
      </p>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-input">
          <input
            type="text"
            id="lecturer_name"
            name="name"
            className="form-control"
            value={formData.supervisor.name}
            onChange={handleInputChange}
          />
          {errors.supervisorName  && <span className="error-text">{errors.supervisorName }</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="form-input">
          <input
            type="email"
            id="lecturer_email"
            name="email"
            className="form-control"
            value={formData.supervisor.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Approval;
