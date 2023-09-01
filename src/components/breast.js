import React,{useState} from 'react';
import { Button ,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BCancer = () => {
  const [prediction, setPrediction] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    texture_mean: '',
    smoothness_mean: '',
    compactness_mean: '',
    concave_points_mean: '',
    symmetry_mean: '',
  fractal_dimension_mean: '',
    texture_se: '',
    area_se: '',
    smoothness_se: '',
    compactness_se: '',
    concavity_se: '',
    concave_points_se: '',
    symmetry_se: '',
    fractal_dimension_se: '',
    texture_worst: '',
    area_worst: '',
    smoothness_worst:'',
    compactness_worst:'',
    concavity_worst:'',
    concave_points_worst:'',
    symmetry_worst:'',
    fractal_dimension_worst:''
    
  });

  const handlePredict = async (inputData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/bcancer', {
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
      return parseFloat(value);
    });
    await handlePredict(inputData);
    console.log(inputData);
  };
  return (
    <div className='stroke-cont'>
      <center>
        <h3>Breast Cancer Prediction</h3>
      </center>
      <label>
        Texture_mean:<br></br>
        <input type="text" name='texture_mean' placeholder="Texture_mean" onClick={handleChange}/><br></br>
      </label>
      <label>
        Smoothness_mean:<br></br>
        <input type="text" name='smoothness_mean' placeholder="Smoothness_mean" onClick={handleChange} /><br></br>
      </label>
      <label>
        Compactness_mean:<br></br>
        <input type="text" name='compactness_mean' placeholder="Compactness_mean" onClick={handleChange} /><br></br>
      </label>
      <label>
        Cancave Points_mean:<br></br>
        <input type="text" name='concave_points_mean' placeholder="Cancave Points_mean" onClick={handleChange} /><br></br>
      </label>
      <label>
        Symmetry_mean:<br></br>
        <input type="text" name='symmetry_mean' placeholder="Symmetry_mean" onClick={handleChange} /><br></br>
      </label>
      <label>
        Fractal Dimension_mean:<br></br>
        <input type="text" name='fractal_dimension_mean' placeholder="Fractal Dimension_mean" onClick={handleChange} /><br></br>
      </label>
      <label>
        Texture_se:<br></br>
        <input type="text" name=' texture_se' placeholder="Texture_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Area_se:<br></br>
        <input type="text" name='area_se' placeholder="Area_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Smoothness_se:<br></br>
        <input type="text" name='smoothness_se' placeholder="Smoothness_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Compactness_se:<br></br>
        <input type="text" name='compactness_se' placeholder="Compactness_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Concavity_se:<br></br>
        <input type="text" name='concavity_se' placeholder="Concavity_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Cancave Points_se:<br></br>
        <input type="text" name='concave_points_se' placeholder="Cancave Points_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Symmetry_se:<br></br>
        <input type="text" name='symmetry_se' placeholder="Symmetry_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Fractal Dimension_se:<br></br>
        <input type="text" name='fractal_dimension_se' placeholder="Fractal Dimension_se" onClick={handleChange} /><br></br>
      </label>
      <label>
        Texture_worst:<br></br>
        <input type="text" name='texture_worst' placeholder="Texture_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Area_worst:<br></br>
        <input type="text" name='area_worst' placeholder="Area_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Smoothness_worst:<br></br>
        <input type="text" name='smoothness_worst' placeholder="Smoothness_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Compactness_worst:<br></br>
        <input type="text" name='compactness_worst' placeholder="Compactness_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Concavity_worst:<br></br>
        <input type="text" name='concavity_worst' placeholder="Concavity_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Cancave Points_worst:<br></br>
        <input type="text" name='concave points_worst' placeholder="Concave Points_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Symmetry_worst:<br></br>
        <input type="text" name='symmetry_worst' placeholder="Symmetry_worst" onClick={handleChange} /><br></br>
      </label>
      <label>
        Fractal Dimension_worst:<br></br>
        <input type="text" name='fractal_dimension_worst' placeholder="Fractal Dimension_worst" onClick={handleChange} /><br></br>
      </label>
      <Button variant="contained" color="success" onClick={storeData}>
        Predict Results
      </Button>
      <br></br><br></br>
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
  );
};

export default BCancer;