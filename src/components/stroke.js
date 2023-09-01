import React, { useState } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const Stroke = () => {
  const [prediction, setPrediction] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heartDisease: '',
    married: '',
    workType: '',
    residenceType: '',
    averageGlucoselevel: '',
    bmi: '',
    smoking: '',
  });

  const handlePredict = async (inputData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/stroke', {
        data: inputData,
      });
      setPrediction(response.data.prediction);
      setOpen(true);
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

  const handleClose = () => {
    setOpen(false);
  };

  const storeData = async () => {
    const inputData = Object.values(formData).map((value) => {
      if (value === 'Yes') {
        return 1;
      } else if (value === 'No') {
        return 0;
      }
      else if (value === 'Male') {
        return 1;}
      else if(value === 'Female'){
        return 0;
      }
      else if(value === 'Private'){
        return 1;
      }
      else if(value === 'Self-employed'){
        return 2;
      }
      else if(value === 'children'){
        return 3;
      }
      else if(value === 'Never_worked'){
        return 4;
      }
      else if(value === 'Urban'){
        return 1;
      }
      else if(value === 'Rural'){
        return 0;
      }
      else if(value === 'formerly_smoked'){
        return 1;
      }
      else if(value === 'never_smoked'){
        return 2;
      }
      else if(value === 'smokes'){
        return 3;
      }
      else{
        return parseFloat(value);
      }
    });
    await handlePredict(inputData);
    console.log(inputData);
  };

  return (
    <div>
      <center>
        <h3>Stroke Prediction</h3>
      </center>
      <div className='stroke-cont'>
      <div>
      <br></br><br></br>
        <label>What's your gender?</label>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="Female"
          />
        </RadioGroup>
      </div>
      <div>
      <div> <label>How old are you?</label><br></br>
      <input type='number' name="age" value={formData.age} placeholder='Age' onChange={handleChange} /></div>
        <label>Do you have Hypertension?</label>
        <RadioGroup
          row
          name="hypertension"
          value={formData.hypertension}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
      </div>
      <div>
        <label>Do you have Heart Disease?</label>
        <RadioGroup
          row
          name="heartDisease"
          value={formData.heartDisease}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
      </div>
      <div>
        <label>Are you Married?</label>
        <RadioGroup
          row
          name="married"
          value={formData.married}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
      </div>
      <div>
        <label>What's your Work Type?</label>
        <RadioGroup
          row
          name="workType"
          value={formData.workType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Private"
            control={<Radio />}
            label="Private"
          />
          <FormControlLabel
            value="Self-employed"
            control={<Radio />}
            label="Self Employed"
          />
          <FormControlLabel
            value="Never_Worked"
            control={<Radio />}
            label="Never Worked"
          />
          <FormControlLabel
            value="children"
            control={<Radio />}
            label="Children"
          />
        </RadioGroup>
      </div>
      <div>
        <label>What's your Residence Type?</label>
        <RadioGroup
          row
          name="residenceType"
          value={formData.residenceType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Rural"
            control={<Radio />}
            label="Rural"
          />
          <FormControlLabel
            value="Urban"
            control={<Radio />}
            label="Urban"
          />
        </RadioGroup>
      </div>
      
      <div>
      <div> <label>Average Glucose Level:</label><br></br>
      <input type='number' name="averageGlucoselevel" value={formData.averageGlucoselevel} placeholder='Average Glucose Level' onChange={handleChange} /></div>
      </div>
      <div>
      <label>BMI:</label><br></br>
      <input type='number' name="bmi" value={formData.bmi} placeholder='BMI' onChange={handleChange} />
      </div>
      <div>
        <label>Have you formerly smoked?</label>
        <RadioGroup
          row
          name="smoking"
          value={formData.smoking}
          onChange={handleChange}
        >
          <FormControlLabel
            value="formerly_smoked"
            control={<Radio />}
            label="Formerly Smoked"
          />
          <FormControlLabel
            value="never_smoked"
            control={<Radio />}
            label="Never Smoked"
          />
          <FormControlLabel
            value="smokes"
            control={<Radio />}
            label="Smokes"
          />
        </RadioGroup>
      </div>
      <div className='pr'>
      <Button variant="contained" style={{backgroundColor: '#e6445c'}} onClick={storeData}>
          Predict Results
        </Button>
        </div>
      <br /><br></br>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Prediction Results</DialogTitle>
        <DialogContent>
          <DialogContentText>{prediction}</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to='/components/sexplore'>
        <Button variant="contained" color="primary">
          Explore
        </Button>
        </Link>
          <Button onClick={handleClose} variant="contained" color="primary"  style={{ marginLeft: '10px' }}>
            Close
          </Button>
         
        </DialogActions>
        <p style={{ marginLeft: '10px' }}>*This is an ML model generated report.Kindly consult the doctor for further clarification</p>
      </Dialog>
        <br /><br />
    </div>
    </div>
  );
};

export default Stroke;
