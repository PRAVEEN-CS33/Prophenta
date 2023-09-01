// InputForm.js
import React, { useState } from 'react';

const InputForm = () => {
  const [selectedOption, setSelectedOption] = useState('diabetes');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'diabetes':
        return (
          <div>
            <input type="number" placeholder="Age" />
            <input type="number" placeholder="Pregnancies" />
            <input type="number" placeholder="Glucose" />
            <input type="number" placeholder="Insulin" />
            <input type="number" placeholder="BMI" />
          </div>
        );
      case 'lung':
        return (
          <div>
            <input type="number" placeholder="Age" />
            <input type="text" placeholder="Yellow Fingers" />
            <input type="text" placeholder="Asthma" />
          </div>
        );
      // Add cases for other options
      default:
        return null;
    }
  };

  return (
    <div className="input-form">
      <div className="sidebar">
        <div
          className={`sidebar-option ${selectedOption === 'diabetes' ? 'active' : ''}`}
          onClick={() => handleOptionSelect('diabetes')}
        >
          Diabetes
        </div>
        <div
          className={`sidebar-option ${selectedOption === 'lung' ? 'active' : ''}`}
          onClick={() => handleOptionSelect('lung')}
        >
          Lung
        </div>
        {/* Add options for other items */}
      </div>
      {renderInputFields()}
    </div>
  );
};

export default InputForm;
