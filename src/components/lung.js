import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';
import limg from './lung.png';

const Lung = () => {
  const [prediction, setPrediction] = useState("");
  const [open, setOpen] = useState(false);
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
  const [isUploading, setIsUploading] = useState(false);
  const handlePredict = async (inputData) => {
    try {
      console.log("predicting...")
      const response = await axios.post("http://127.0.0.1:5000/lung", {
        data: inputData,
      });
      console.log("Prediction response:",response.data.prediction)
      setPrediction(response.data.prediction);
      setOpen(true);
    
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
    const inputData = Object.values(formData).map(value => {
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
    await handlePredict(inputData);
    console.log("Input data:" ,inputData);
  };

   const handleUploadClick = () => {
    setIsUploading(true);
  };

  const handleFileUpload = (event) => {
    // Handle file upload logic here
    // You can access the uploaded file using event.target.files[0]
  };

  return (
    <div>
      <form>
        <center><h3>Lung Disease Prediction</h3></center>
        <div className='lung-cont'>
        <br></br>
        {isUploading ? (
      <div>
        <label>Upload File:</label><br />
        <input type="file" accept=".csv,.xlsx,.txt" onChange={handleFileUpload} />
      </div>
    ) : (
      <div>
      <Button variant="outlined" color="primary" style={{marginLeft: '300px'}} onClick={handleUploadClick}>
              Upload File
            </Button>
            <br></br>
        
        <FormLabel component="legend">What's your gender?</FormLabel>
        <RadioGroup name="gender" value={formData.gender} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </div>
        </RadioGroup>
        
        <label>How old are you?</label><br></br>
        <input type='number' name="age" value={formData.age} placeholder='Age' onChange={handleChange} />
        <FormLabel component="legend">Do you smoke?</FormLabel>
        <RadioGroup name="smoking" value={formData.smoking} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you have yellow fingers?</FormLabel>
        <RadioGroup name="yellowFingers" value={formData.yellowFingers} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you feel anxious?</FormLabel>
        <RadioGroup name="anxiety" value={formData.anxiety} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you have Peer Pressure?</FormLabel>
        <RadioGroup name="peerPressure" value={formData.peerPressure} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Are you affected by Chronic Diseases?</FormLabel>
        <RadioGroup name="chronicDisease" value={formData.chronicDisease} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you feel fatigue often?</FormLabel>
        <RadioGroup name="fatigue" value={formData.fatigue} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Are you allergic?</FormLabel>
        <RadioGroup name="allergy" value={formData.allergy} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you have wheezing trouble?</FormLabel>
        <RadioGroup name="wheezing" value={formData.wheezing} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you consume alcohol?</FormLabel>
        <RadioGroup name="alcohol" value={formData.alcohol} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you cough often?</FormLabel>
        <RadioGroup name="coughing" value={formData.coughing} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Are you affected by shortness of breath?</FormLabel>
        <RadioGroup name="shortnessOfBreath" value={formData.shortnessOfBreath} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you have swallowing Difficulty?</FormLabel>
        <RadioGroup name="swallowingDifficulty" value={formData.swallowingDifficulty} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        
        <FormLabel component="legend">Do you have chest Pain?</FormLabel>
        <RadioGroup name="chestPain" value={formData.chestPain} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
        </div>
    )}

        <Button variant="contained" style={{backgroundColor: '#e6445c'}} onClick={storeData}>
          Predict Results
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Prediction Results</DialogTitle>
        <DialogContent>
          <DialogContentText>{prediction}</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to='/components/explore'>
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
      </form>     
    </div>
  );
};

export default Lung;
