import React, { useState } from 'react';
import './styles.css';
import Diabetes from './diabetes'; // Import disease-specific components
import Lung from './lung';
import Kidney from './kidney';
import Cervix from './cervix';
import Stroke from './stroke';
import BCancer from './breast';
import Image from './imgpred';
import Catract from './catract';
import Brain from './Brain';
import DRetino from './dretinopathy';
import Parasite from './parasite';
import MPox from './mpox';
import SCancer from './SCancer';
import Alzhe from './alzhemier';
import Stenosis from './steno';

// Import other disease components

const InputForm = () => {
  const [selectedOption, setSelectedOption] = useState('diabetes');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'diabetes':
        return <Diabetes />;
      case 'lung':
        return <Lung />;
      case 'cervix':
        return <Cervix />;
      case 'kidney':
        return <Kidney />;
      case 'stroke':
        return <Stroke />;
      case 'bcancer':
        return <BCancer />;
      case 'alzhe':
        return <Alzhe />;
      case 'pneu':
        return <Image />;
      case 'eye':
        return <Catract />;
      case 'skin':
        return <SCancer />;
      case 'brain':
        return <Brain />;
      case 'dretino':
        return <DRetino />
      case 'parasite':
        return <Parasite />
      case 'mpox':
        return <MPox />
      case 'steno':
        return <Stenosis />
      // Return other disease components here
      default:
        return null;
    }
  };

  return (
    <div className="input-form">
      <div className="sidebar">
        <h2>Multiple Disease Prediction System</h2>
        <div className='option'>
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
          <div
            className={`sidebar-option ${selectedOption === 'kidney' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('kidney')}
          >
            Kidney
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'stroke' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('stroke')}
          >
            Stroke
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'cervix' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('cervix')}
          >
            Cervical Cancer
          </div>

          <div
            className={`sidebar-option ${selectedOption === 'pneu' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('pneu')}
          >
            Pneumonia
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'eye' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('eye')}
          >
            Catract
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'skin' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('skin')}
          >
            Skin Cancer
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'brain' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('brain')}
          >
            Brain Tumor
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'alzhe' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('alzhe')}
          >
            Alzheimer Disease
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'dretino' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('dretino')}
          >
            Diabetic Retinopathy
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'steno' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('steno')}
          >
            Stenosis
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'parasite' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('parasite')}
          >
            Parasitic Diseases
          </div>
          <div
            className={`sidebar-option ${selectedOption === 'mpox' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('mpox')}
          >
            Monkey Pox
          </div>
          {/* Add other disease options here */}
        </div>
        </div>
        <div className="input-fields">
          {renderInputFields()}
        </div>
      </div>
  );
};

export default InputForm;
