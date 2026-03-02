import React from 'react';
import './stepper.css';
import { TiTick } from 'react-icons/ti';

const Stepper = ({ currentStep, steps, complete }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 ? 'active' : ''} ${
            i + 1 < currentStep || complete ? 'complete' : ''
          }`}
        >
          <div className="step">
            {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
          </div>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;



