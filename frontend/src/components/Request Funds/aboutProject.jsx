import React from "react";

const AboutProject = ({ onFormDataChange, formData, errors }) => {
  // Handle change for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectType") {
      onFormDataChange({
        projectInfo: { ...formData.projectInfo, [name]: value },
      });
    } else if (name === "budgetDetails") {
      onFormDataChange({ budgetDetails: e.target.files[0] });
    } else {
      onFormDataChange({
        projectInfo: { ...formData.projectInfo, [name]: value },
      });
    }
  };

  return (
    <div className="formSection">
      <p className="contact-info-title">About Project</p>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="projectname">Project Title</label>
        </div>
        <div className="form-input">
          <input
            type="text"
            id="projectname"
            name="projectTitle"
            className="form-control"
            value={formData.projectInfo.projectTitle}
            onChange={handleInputChange}
          />
          {errors.projectTitle && (
            <span className="error-text">{errors.projectTitle}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="description">Project Description</label>
        </div>
        <div className="form-input">
          <textarea
            id="description"
            name="projectDescription"
            className="form-control"
            style={{ height: "50px" }}
            value={formData.projectInfo.projectDescription}
            onChange={handleInputChange}
          ></textarea>
          {errors.projectDescription && (
            <span className="error-text">{errors.projectDescription}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="goals">
            What are the project goals and how they will be reached
          </label>
        </div>
        <div className="form-input">
          <textarea
            id="goals"
            name="goal"
            className="form-control"
            style={{ height: "100px" }}
            value={formData.projectInfo.goal}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="risks">
            What are the risks that would have an impact on the successful
            delivery of the project and what is your plan to overcome them?
          </label>
        </div>
        <div className="form-input">
          <textarea
            id="risks"
            name="risks"
            className="form-control"
            style={{ height: "150px" }}
            value={formData.projectInfo.risks}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="projectType">Project Type</label>
        </div>
        <div className="form-input">
          <div className="radio-group">
            <div className="radio-item">
              <input
                type="radio"
                id="coursework"
                name="projectType"
                value="coursework"
                checked={formData.projectInfo.projectType === "coursework"}
                onChange={handleInputChange}
              />
              <label htmlFor="coursework">Coursework</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="competition"
                name="projectType"
                value="competition"
                checked={formData.projectInfo.projectType === "competition"}
                onChange={handleInputChange}
              />
              <label htmlFor="competition">Competition</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="hobby"
                name="projectType"
                value="hobby"
                checked={formData.projectInfo.projectType === "hobby"}
                onChange={handleInputChange}
              />
              <label htmlFor="hobby">Hobby</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="other"
                name="projectType"
                value="other"
                checked={formData.projectInfo.projectType === "other"}
                onChange={handleInputChange}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="startingDate">The Expected Starting Date</label>
        </div>
        <div className="form-input">
          <input
            type="date"
            id="startingDate"
            name="startingDate"
            className="date-input"
            value={formData.projectInfo.startingDate}
            onChange={handleInputChange}
          />
          {errors.startingDate && (
            <span className="error-text">{errors.startingDate}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="endingDate">
            When will your project be completed
          </label>
        </div>
        <div className="form-input">
          <input
            type="date"
            id="endingDate"
            name="completionDate"
            className="date-input"
            value={formData.projectInfo.completionDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="report">
          <label>
            How much will it cost to complete the project? Attach a detailed
            budget report (estimated cost of equipment) and clarify the
            requirements of the purchasing equipment.
          </label>
          <span className="error-text">
            Note: Applications submitted without this information cannot be
            considered for funding.
          </span>
          <p className="file-instructions">
            Attach the budget report in the .pdf format, 10MB max
          </p>
          <input
            type="file"
            id="fileInput"
            name="budgetDetails"
            accept=".pdf"
            className="pdf-input"
            onChange={handleInputChange}
          />
          {errors.budgetDetails && (
            <span className="error-text">{errors.budgetDetails}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="report">
          <input
            type="checkbox"
            id="isChecked"
            name="isChecked"
            checked={formData.isChecked || false}
            onChange={(e) => onFormDataChange({ isChecked: e.target.checked })}
          />
          <label htmlFor="isChecked" style={{ paddingLeft: "15px" }}>
            I, the Project Lead hereby confirm the above-mentioned information
            is accurate as per my understanding.
          </label>
          {errors.isChecked && (
            <span className="error-text">{errors.isChecked}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
