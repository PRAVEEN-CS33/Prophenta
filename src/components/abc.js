import React, { useState } from 'react';
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, MenuItem, Select } from '@mui/material';
import axios from 'axios';
const questions = [
    "What's your gender?",
    "How old are you?",
    "Do you smoke?",
    "Do you have yellow fingers?",
    "Do you feel anxious?",
    "Do you have Peer Pressure?",
    "Are you affected by Chronic Diseases?",
    "Do you feel fatigue often?",
    "Are you allergic?",
    "Do you have wheezing trouble?",
    "Do you consume alcohol?",
    "Do you cough often?",
    "Are you affected by shortness of breath?",
    "Do you have swallowing Difficulty?",
    "Do you have chest Pain?",
  ];
  const Lung = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [prediction, setPrediction] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If it's the last question, predict results
      const inputData = Object.values(formData).map((value) => {
        if (value === 'Yes') {
          return 2;
        } else if (value === 'No') {
          return 1;
        } else if (value === 'Male') {
          return 1;
        } else if (value === 'Female') {
          return 0;
        } else {
          return parseInt(value, 10);
        }
      });
      handlePredict(inputData);
    }
  };

  return (
    <div>
      <center>
        <h3>Lung Cancer Prediction</h3>
      </center>
      <Card>
        <CardContent>
          <label>{questions[currentQuestion]}</label>
          <br />
          {currentQuestion === 0 && (
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="" disabled hidden>
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          )}
          {currentQuestion === 1 && (
            <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} />
          )}
          {currentQuestion === 2 && (
            <select name="smoking" value={formData.smoking} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 3 && (
            <select name="yellowFingers" value={formData.yellowFingers} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 4 && (
            <select name="anxiety" value={formData.anxiety} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 5 && (
            <select name="peerPressure" value={formData.peerPressure} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 6 && (
            <select name="chronicDisease" value={formData.chronicDisease} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 7 && (
            <select name="fatigue" value={formData.fatigue} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 8 && (
            <select name="allergy" value={formData.allergy} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 9 && (
            <select name="wheezing" value={formData.wheezing} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 10 && (
            <select name="alcohol" value={formData.alcohol} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 11 && (
            <select name="coughing" value={formData.coughing} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 12 && (
            <select name="shortnessOfBreath" value={formData.shortnessOfBreath} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 13 && (
            <select name="swallowingDifficulty" value={formData.swallowingDifficulty} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          {currentQuestion === 14 && (
            <select name="chestPain" value={formData.chestPain} onChange={handleChange}>
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          )}
          <br />
          <Button variant="contained" color="primary" onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? 'Predict Results' : 'Next'}
          </Button>
        </CardContent>
      </Card>
      <br />
      {prediction && (
        <div>
          Prediction Results: {prediction}
        </div>
      )}
    </div>
  );

};

export default Lung;