import React from "react";

const ContactInfo = ({ onFormDataChange, formData, errors }) => {
  // Handle change for lead name and email/phone
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data for different fields
    if (name === "leader") {
      onFormDataChange({ leader: value });
    } else if (name === "email" || name === "phone") {
      onFormDataChange({
        contactInfo: { ...formData.contactInfo, [name]: value },
      });
    }
  };

  // Handle team member input change
  const handleTeamMembersChange = (index, value) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = value;
    onFormDataChange({ teamMembers: updatedTeamMembers });
  };

  return (
    <div className="formSection">
      <p className="contact-info-title">Contact Information</p>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="teamMembers">Full names of the Applicants</label>
        </div>

        <div className="form-input">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="text"
              id={`teamMember${index}`}
              name={`teamMember${index}`}
              className="form-control"
              placeholder={`Team Member ${index + 1}`}
              value={formData.teamMembers[index] || ""}
              onChange={(e) => handleTeamMembersChange(index, e.target.value)}
            />
          ))}
          {errors.teamMembers && (
            <span className="error-text">{errors.teamMembers}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="leader">Lead's Name</label>
        </div>
        <div className="form-input">
          <input
            type="text"
            id="leader"
            name="leader"
            className="form-control"
            value={formData.leader}
            onChange={handleInputChange}
          />
          {errors.leader && <span className="error-text">{errors.leader}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="form-input">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.contactInfo.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="phone">Contact Number</label>
        </div>
        <div className="form-input">
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="0xx-xxxxxxx"
            value={formData.contactInfo.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
