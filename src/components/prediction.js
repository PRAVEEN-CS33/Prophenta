import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import './styles.css';
import axios from 'axios';

const InputForm = () => {
  const [selectedOption, setSelectedOption] = useState('diabetes');
  const [isImageMode, setIsImageMode] = useState(false);
  const [prediction, setPrediction] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsImageMode(false); // Reset to manual input mode when changing options
  };

  const handlePredict = async (inputData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/lung", {
        data: inputData,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    smoking: '',
    yellowFingers: '',
    anxiety: '',
    peerPressure: '',
    chronicDisease: '',
    fatigue: '',
    allergy: '',
    wheezing: '',
    alcohol: '',
    coughing: '',
    shortnessOfBreath: '',
    swallowingDifficulty: '',
    chestPain: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const storeData = () => {
    const inputData = Object.values(formData).map(value => {
      return isNaN(value) ? value : parseFloat(value);
    });
    handlePredict(inputData);
  
    console.log(inputData); // You can use this array as needed, e.g., send it to a server, process it further, etc.
  };
  
  const handleModeToggle = () => {
    setIsImageMode(!isImageMode);
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    console.log('Uploaded Image:', uploadedImage);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      axios.post('http://127.0.0.1:5000/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer' // Receive response as binary data
      })
      .then(response => {
        const imageUrl = URL.createObjectURL(new Blob([response.data]));
        setPredictedImage(imageUrl);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'diabetes':
        return (
          <div>
          <center><h3>Diabetes Prediction</h3></center>
            <input type="number" placeholder="Age" />
            <input type="number" placeholder="Pregnancies" />
            <input type="number" placeholder="Glucose" />
            <input type="number" placeholder="Blood Pressure" />
            <input type="number" placeholder="Skin Thickness" />
            <input type="number" placeholder="Insulin" />
            <input type="number" placeholder="BMI" />
            <input type="number" placeholder="Diabetes Pedigree Function" />
          </div>
        );
      case 'lung':

     
       
        return (
          <div>
          <center><h3>Lung Cancer Prediction</h3></center>
          <input type="number" name="gender" placeholder="Gender" onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} />
          <input type="number" name="smoking" placeholder="Smoking" onChange={handleChange} />
          <input type="number" name="yellowFingers" placeholder="Yellow Fingers" onChange={handleChange} />
          <input type="number" name="anxiety" placeholder="Anxiety" onChange={handleChange} />
          <input type="number" name="peerPressure" placeholder="Peer Pressure" onChange={handleChange} />
          <input type="number" name="chronicDisease" placeholder="Chronic Disease" onChange={handleChange} />
          <input type="number" name="fatigue" placeholder="Fatigue" onChange={handleChange} />
          <input type="number" name="allergy" placeholder="Allergy" onChange={handleChange} />
          <input type="number" name="wheezing" placeholder="Wheezing" onChange={handleChange} />
          <input type="number" name="alcohol" placeholder="Alcohol" onChange={handleChange} />
          <input type="number" name="coughing" placeholder="Coughing" onChange={handleChange} />
          <input type="number" name="shortnessOfBreath" placeholder="Shortness of Breath" onChange={handleChange} />
          <input type="number" name="swallowingDifficulty" placeholder="Swallowing Difficulty" onChange={handleChange} />
          <input type="number" name="chestPain" placeholder="Chest Pain" onChange={handleChange} />
        </div>
        );
      case 'stroke':
        
        return (
          <div>
          <center><h3>Stroke Prediction</h3></center>
            <input type="number" placeholder="Gender" />
            <input type="number" placeholder="Age" />
            <input type="number" placeholder="Hypertension" />
            <input type="number" placeholder="Heart Disease" />
            <input type="number" placeholder="Married" />
            <input type="text" placeholder="Work Type" />
            <input type="text" placeholder="Residence Type" />
            <input type="number" placeholder="Average Glucose Level" />
            <input type="number" placeholder="BMI" />
            <input type="number" placeholder="Smoking" />
          </div>
        );
      case 'kidney':
        return (
          <div>
          <center><h3>Chronic Kidney Disease Prediction</h3></center>
            <input type="number" placeholder="Age" />
            <input type="number" placeholder="Blood pressure" />
            <input type="number" placeholder="Specific Gravity" />
            <input type="number" placeholder="Albumin" />
            <input type="number" placeholder="Sugar" />
            <input type="number" placeholder="RBC" />
            <input type="number" placeholder="Puss cells" />
            <input type="number" placeholder="Puss cell clumps" />
            <input type="number" placeholder="Bacteria" />
            <input type="number" placeholder="Blood Glucose Random" />
            <input type="number" placeholder="Blood Urea" />
            <input type="number" placeholder="Serum Creatinine" />
            <input type="number" placeholder="Sodium" />
            <input type="number" placeholder="Potassium" />
            <input type="number" placeholder="Haemoglobin" />
            <input type="number" placeholder="Packed Cell Volume" />
            <input type="number" placeholder="White Blood Cells Count" />
            <input type="number" placeholder="Red Blood Cells Count" />
            <input type="number" placeholder="HyperTension" />
            <input type="number" placeholder="Diabetes Mellitus" />
            <input type="number" placeholder="Coronary Artery Disease" />
            <input type="number" placeholder="Appetite" />
            <input type="number" placeholder="Pedal Edema" />
            <input type="number" placeholder="Anemia" />
            
          </div>
        );
        case 'cervix':
        return (
          <div>
          <center><h3>Cervical Cancer Prediction</h3></center>
          <input type="number" placeholder="Age" />
            <input type="number" placeholder="No.of sexual partners" />
            <input type="number" placeholder="Age of first sexual intercourse" />
            <input type="number" placeholder="No.of Pregnancies" />
            <input type="number" placeholder="Smokes/year" />
            <input type="number" placeholder="Hormonal Contraceptives" />
            <input type="number" placeholder="IUD(years)" />
            <input type="number" placeholder="STD(numbers)" />
            <input type="number" placeholder="STD (Number of Diagnosis)" />
            <input type="number" placeholder="STD (Time since First Diagnosis)" />
            <input type="number" placeholder="STD(Time since last Diagnosis)" />
            <input type="number" placeholder="Dx:Cancer" />
            <input type="number" placeholder="Dx:CIN" />
            <input type="number" placeholder="Hinselmann" />
            <input type="number" placeholder="Schiller" />
            <input type="number" placeholder="Citology" />
          </div>
        );
        case 'breast':
        return (
          <div>
          <center><h3>Breast Cancer Prediction</h3></center>
            <input type="number" placeholder="Radius_mean" />
            <input type="number" placeholder="Texture_mean" />
            <input type="number" placeholder="Perimeter_mean" />
            <input type="number" placeholder="Area_mean" />
            <input type="number" placeholder="Smoothness_mean" />
            <input type="number" placeholder="Compactness_mean" />
            <input type="number" placeholder="Concavity_mean" />
            <input type="number" placeholder="Cancave Points_mean" />
            <input type="number" placeholder="Symmetry_mean" />
            <input type="number" placeholder="Fractal Dimension_mean" />
            <input type="number" placeholder="Radius_se" />
            <input type="number" placeholder="Texture_se" />
            <input type="number" placeholder="Perimeter_se" />
            <input type="number" placeholder="Area_se" />
            <input type="number" placeholder="Smoothness_se" />
            <input type="number" placeholder="Compactness_se" />
            <input type="number" placeholder="Concavity_se" />
            <input type="number" placeholder="Cancave Points_se" />
            <input type="number" placeholder="Symmetry_se" />
            <input type="number" placeholder="Fractal Dimension_se" />
            <input type="number" placeholder="Radius_worst" />
            <input type="number" placeholder="Texture_worst" />
            <input type="number" placeholder="Perimeter_worst" />
            <input type="number" placeholder="Area_worst" />
            <input type="number" placeholder="Smoothness_worst" />
            <input type="number" placeholder="Compactness_worst" />
            <input type="number" placeholder="Concavity_worst" />
            <input type="number" placeholder="Cancave Points_worst" />
            <input type="number" placeholder="Symmetry_worst" />
            <input type="number" placeholder="Fractal Dimension_worst" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="input-form">
      <div className="sidebar">
        <h2>Multiple Disease Prediction System</h2>
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
      className={`sidebar-option ${selectedOption === 'stroke' ? 'active' : ''}`}
      onClick={() => handleOptionSelect('stroke')}
    >
      Stroke
    </div>
    <div
    className={`sidebar-option ${selectedOption === 'kidney' ? 'active' : ''}`}
    onClick={() => handleOptionSelect('kidney')}
  >
    Kidney
  </div>
  <div
    className={`sidebar-option ${selectedOption === 'cervix' ? 'active' : ''}`}
    onClick={() => handleOptionSelect('cervix')}
  >
    Cervical Cancer
  </div>
  <div
    className={`sidebar-option ${selectedOption === 'breast' ? 'active' : ''}`}
    onClick={() => handleOptionSelect('breast')}
  >
    Breast Cancer
  </div>
  <div
  className={`sidebar-option ${selectedOption === 'skin' ? 'active' : ''}`}
  onClick={() => handleOptionSelect('skin')}
>
  Skin Cancer
</div>
<div
className={`sidebar-option ${selectedOption === 'eye' ? 'active' : ''}`}
onClick={() => handleOptionSelect('eye')}
>
Eye Disease
</div>
      </div>
      <div className="input-fields">
        {isImageMode ? (
          <div className="upload-box">
            <h2>Upload Image to Predict</h2>
            <div className='stroke-cont'>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload & Predict</button>
        {predictedImage && <img src={predictedImage} alt="Predicted Image" />}
      </div>
          </div>
        ) : (
          renderInputFields()
        )}
        <Button variant="contained" color="success" onClick={storeData}>
          Predict Results
        </Button>
        <Button variant="contained" color="success" onClick={handleImageChange}>
          Image Predict
        </Button>
      </div>
      <div className="mode-toggle">
          <Button
            variant="contained"
            color="primary"
            startIcon={isImageMode ? <AddIcon /> : <ImageIcon />}
            onClick={handleModeToggle}
          >
            {isImageMode ? 'Manual' : 'Image'}
          </Button>
        </div>
        <div>Predict:{prediction}</div>
    </div>
  );
};

export default InputForm;
