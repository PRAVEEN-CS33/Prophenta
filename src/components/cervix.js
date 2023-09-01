import React, {useState} from 'react';
import { Button ,Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Cervix = () => {
  const [prediction, setPrediction] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    sp: '',
    agesi: '',
    preg: '',
    sy: '',
    hc: '',
    iudy: '',
    stdn: '',
    stdnd: '',
    stdf: '',
    stdl: '',
    cancer: '',
    cin: '',
    hin: '',
    schill: '',
    cit: ''


  });

  const handlePredict = async (inputData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/cervix", {
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
    const inputData = Object.values(formData).map(value => {
      if (value === 'Yes') {
        return 1;
      } else if (value === 'No') {
        return 0;
      }else{
        return parseFloat(value);
      }
    });
    await handlePredict(inputData);
    console.log(inputData);
  };

  
  return (
    <div>
      <center><h3>Cervical Cancer Prediction</h3></center>
      <div className='stroke-cont'>
      <br></br>
      <label>Age:</label><br></br>
      <input  nametype="number" name='age'  value={formData.age} placeholder="Age" onChange={handleChange} /><br></br>
      
      <label>Number of Sexual Partners:</label><br></br>
      <input type="number" name='sp' value={formData.sp} placeholder="Number of sexual partners" onChange={handleChange} /><br></br>
      
      <label>Age of First Sexual Intercourse:</label><br></br>
      <input type="number" name='agesi' value={formData.agesi} placeholder="Age of first sexual intercourse" onChange={handleChange} /><br></br>
      
      <label>Number of Pregnancies:</label><br></br>
      <input type="number" name='preg' value={formData.preg} placeholder="Number of Pregnancies" onChange={handleChange} /><br></br>
      
      <label>Smokes per Year:</label><br></br>
      <input type="number" name='sy' value={formData.sy} placeholder="Smokes/year" onChange={handleChange} /><br></br>
      
      <label>Hormonal Contraceptives:</label><br></br>
      <input type="number" name='hc' value={formData.hc} placeholder="Hormonal Contraceptives" onChange={handleChange} /><br></br>
      
      <label>IUD (Years):</label><br></br>
      <input type="number" name='iudy' value={formData.iudy} placeholder="IUD(years)" onChange={handleChange} /><br></br>
      
      <label>STDs (Number):</label><br></br>
      <input type="number" name='stdn' value={formData.stdn} placeholder="STD(numbers)" onChange={handleChange} /><br></br>
      
      <label>STDs (Number of Diagnosis):</label><br></br>
      <input type="number" name='stdnd' value={formData.stdnd} placeholder="STD (Number of Diagnosis)" onChange={handleChange} /><br></br>
      
      <label>STDs (Time since First Diagnosis):</label><br></br>
      <input type="number" name='stdf' value={formData.stdf} placeholder="STD (Time since First Diagnosis)" onChange={handleChange} /><br></br>
      
      <label>STDs (Time since Last Diagnosis):</label><br></br>
      <input type="number" name='stdl' value={formData.stdl} placeholder="STD (Time since last Diagnosis)" onChange={handleChange} /><br></br>
      
      <div>
        <label>Dx Cancer</label>
        <RadioGroup
          row
          name="cancer"
          value={formData.cancer}
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
      <label>Dx Cin</label>
      <RadioGroup
        row
        name="cin"
        value={formData.cin}
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
      <label>Hinselmann</label>
      <RadioGroup
        row
        name="hin"
        value={formData.hin}
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
    <label>Schiller</label>
    <RadioGroup
      row
      name="schill"
      value={formData.schill}
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
  <label>Citology</label>
  <RadioGroup
    row
    name="cit"
    value={formData.cit}
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
      <Button variant="contained" style={{backgroundColor: '#e6445c'}} onClick={storeData}>
        Predict Results
      </Button>
      <br></br><br></br>
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

export default Cervix;