import React, {useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,FormLabel,Radio,RadioGroup,FormControlLabel } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Kidney = () => {
  const [prediction, setPrediction] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [className, setClassName] = useState(null);
    const [predictedImage, setPredictedImage] = useState(null);
    const [isPredicting, setIsPredicting] = useState(false);
    const [resultPredicted, setResultPredicted] = useState(false);

    const handleImageChange = (e) => {
      setSelectedImage(e.target.files[0]);
      setResultPredicted(false); // Reset result status
    };
  
  const [formData, setFormData] = useState({
    age: '',
    bloodPressure: '',
    specificGravity: '',
    albumin: '',
    sugar: '',
    rbc: '',
    pusscells: '',
    pusscellClumps: '',
    bacteria: '',
    bloodGlucodeRandom: '',
    bloodUrea: '',
    serumCreatinine: '',
    sodium: '',
    potassium: '',
    haemoglobin: '',
    packedCellVolume: '',
    whiteBloodCellsCount: '',
    redBloodCellsCount: '',
    hypertension: '',
    diabetesMellitus: '',
    coronaryArteryDisease: '',
    appetite: '',
    pedalEdema: '',
    anemia: ''
  });
const [isUploading, setIsUploading] = useState(false);
  const handlePredict = async (inputData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/kindney", {
        data: inputData,
      });
      setPrediction(response.data.prediction);
       setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
    const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const storeData = async () => {
    // Create a map to convert categorical values to numeric values
    const categoricalMapping = {
      normal: 0,
      abnormal: 1,
      present: 1,
      notpresent: 0,
      yes: 1,
      no: 0,
      good: 1,
      poor: 0,
    };
  
    // Convert categorical values to numeric values using the mapping
    const inputData = Object.values(formData).map(value => {
      if (isNaN(value)) {
        return categoricalMapping[value];
      } else {
        return parseFloat(value);
      }
    });
  
    await handlePredict(inputData);
    console.log(inputData);
  };
  
  
  const handleUpload = () => {
    if (selectedImage) {
      setIsPredicting(true);
      const formData = new FormData();
      formData.append('image', selectedImage);

      axios
        .post('http://127.0.0.1:5000/extract_data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const value = response.data.age
          console.log(value);
          setFormData((prevData) => ({
            ...prevData,
            ['age']: response.data.age,
            ['bloodPressure']: response.data.bloodPressure,
            ['specificGravity']: response.data["specific Gravity"],
            ['albumin']: response.data.albumin,
            ['sugar']: response.data.sugar,
            ['rbc']: response.data.rbc,
            ['pusscells']: response.data["puss chlls"],
            ['pusscellClumps']: response.data.pusschllclumps,
            ['bacteria']: response.data.bacteria,
            ['bloodGlucodeRandom']: response.data.bloodglucoshrandom,
            ['bloodUrea']: response.data.bloodurha,
            ['serumCreatinine']: response.data.shrumcrhatinine,
            ['sodium']: response.data.sodium,
            ['potassium']: response.data.potassium,
            ['haemoglobin']: response.data.hahmoglobin,
            ['packedCellVolume']: response.data.packedchllvolume,
            ['whiteBloodCellsCount']: response.data.whithbloodchllscount,
            ['redBloodCellsCount']: response.data.redbloodcellscount,
            ['hypertension']: response.data.hyphrthnsion,
            ['diabetesMellitus']: response.data.diabhtesmellitus,
            ['coronaryArteryDisease']: response.data.coronaryarthrydishase,
            ['appetite']: response.data.apphtith,
            ['pedalEdema']: response.data.pedalEdema,
            ['anemia']: response.data.anemta,
          }));
          // setAccuracy(response.data.accuracy);
          // setClassName(response.data.class_name);

          // Make sure response.data.image_data is available
          if (response.data.image_data) {
            setPredictedImage(response.data.image_data);
          } else {
            console.log('Image data not found in the response');
          }

          setResultPredicted(true); // Set result status
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        })
        .finally(() => {
          setIsPredicting(false); // Finish predicting
        });
    }
  };

  //   const handleUploadClick = () => {
  //   setIsUploading(true);
  // };

  const handleFileUpload = (event) => {
    // Handle file upload logic here
    // You can access the uploaded file using event.target.files[0]
  };

  return (
    <div>
    <center><h3>Chronic Kidney Disease Prediction</h3></center>
    <div className='kid-cont'>
    <br></br>
     {isUploading ? (
      <div>
        <label>Upload Report:</label><br />
        <input type="file" accept=".csv,.xlsx,.txt" onChange={handleFileUpload} />
      </div>
    ) : (
      <div>
      <div>
      <input type="file" accept=".csv,.xlsx,.txt,.jpg" onChange={handleImageChange} style={{width: '180px'}} />
      <Button variant="outlined" color="primary" onClick={handleUpload}  style={{marginLeft: '30px'}}>
        Upload Report
      </Button>
    </div>
            <br></br>
    <label>Age:</label><br></br>
      <input type="text" name='age' value={formData.age} placeholder="Age" onChange={handleChange} />
      <br></br>
      <label>Blood Pressure:</label><br></br>
      <input type="text" name='bloodPressure' value={formData.bloodPressure} placeholder="Blood pressure" onChange={handleChange} />
      <br></br>
      <label>Specific Gravity:</label><br></br>
      <input type="text" name='specificGravity' value={formData.specificGravity} placeholder="Specific Gravity" onChange={handleChange} />
      <br></br>
      <label>Albumin:</label><br></br>
      <input type="text" name='albumin' value={formData.albumin} placeholder="Albumin" onChange={handleChange} />
      <br></br>
      <label>Sugar:</label><br></br>
      <input type="text" name='sugar' value={formData.sugar} placeholder="Sugar" onChange={handleChange} />
      <br></br>
      <FormLabel component="legend">What's your RBC count?</FormLabel>
        <RadioGroup name="rbc" value={formData.rbc} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="abnormal" control={<Radio />} label="Abnormal" />
          </div>
        </RadioGroup>
      <br></br>
      <FormLabel component="legend">What's your pusscells count?</FormLabel>
        <RadioGroup name="pusscells" value={formData.pusscells} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="abnormal" control={<Radio />} label="Abnormal" />
          </div>
        </RadioGroup>
      <br></br>
      <FormLabel component="legend">Do you have pusscell Clumps?</FormLabel>
        <RadioGroup name="pusscellClumps" value={formData.pusscellClumps} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="present" control={<Radio />} label="Present" />
          <FormControlLabel value="notpresent" control={<Radio />} label="NotPresent" />
          </div>
        </RadioGroup>
      <br></br>
      <FormLabel component="legend">Bacteria</FormLabel>
        <RadioGroup name="bacteria" value={formData.bacteria} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="present" control={<Radio />} label="Present" />
          <FormControlLabel value="notpresent" control={<Radio />} label="NotPresent" />
          </div>
        </RadioGroup>
      <br></br>
      <label>Blood Glucose Random:</label><br></br>
      <input type="text" name='bloodGlucodeRandom' value={formData.bloodGlucodeRandom} placeholder="Blood Glucose Random" onChange={handleChange} />
      <br></br>
      <label>Blood Urea:</label><br></br>
      <input type="text" name='bloodUrea' value={formData.bloodUrea} placeholder="Blood Urea" onChange={handleChange} />
      <br></br>
      <label>Serum Creatinine:</label><br></br>
      <input type="text" name='serumCreatinine' value={formData.serumCreatinine} placeholder="Serum Creatinine" onChange={handleChange} />
      <br></br>
      <label>Sodium:</label><br></br>
      <input type="text" name='sodium' value={formData.sodium} placeholder="Sodium" onChange={handleChange} />
      <br></br>
      <label>Pottasium:</label><br></br>
      <input type="text" name='potassium' value={formData.potassium} placeholder="Potassium" onChange={handleChange} />
      <br></br>
      <label>Haemoglobin:</label><br></br>
      <input type="text" name='haemoglobin' value={formData.haemoglobin} placeholder="Haemoglobin" onChange={handleChange} />
      <br></br>
      <label>Packed Cell Volume:</label><br></br>
      <input type="text" name='packedCellVolume' value={formData.packedCellVolume} placeholder="Packed Cell Volume" onChange={handleChange} />
      <br></br>
      <label>White Blood Cells Count:</label><br></br>
      <input type="text" name='whiteBloodCellsCount' value={formData.whiteBloodCellsCount} placeholder="White Blood Cells Count" onChange={handleChange} />
      <br></br>
      <label>Red Blood Cells Count:</label><br></br>
      <input type="text" name='redBloodCellsCount' value={formData.redBloodCellsCount} placeholder="Red Blood Cells Count" onChange={handleChange} />
      <br></br>
      <FormLabel component="legend">Do you have hypertension?</FormLabel>
        <RadioGroup name="hypertension" value={formData.hypertension} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
      <br></br>
      <FormLabel component="legend">Do you have Diabetes Mellitus</FormLabel>
        <RadioGroup name="diabetesMellitus" value={formData.diabetesMellitus} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
      <br></br>
      <FormLabel component="legend">Do you have Coronary Artery Disease?</FormLabel>
      <RadioGroup name="coronaryArteryDisease" value={formData.coronaryArteryDisease} onChange={handleChange}>
      <div className='r-grp'>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
        </div>
      </RadioGroup>
      <br></br>
      <FormLabel component="legend">How is your appetite?</FormLabel>
      <RadioGroup name="appetite" value={formData.appetite} onChange={handleChange}>
      <div className='r-grp'>
        <FormControlLabel value="good" control={<Radio />} label="Good" />
        <FormControlLabel value="poor" control={<Radio />} label="Poor" />
        </div>
      </RadioGroup>
      <br></br>
      <FormLabel component="legend">Do you have Pedal pedalEdema?</FormLabel>
        <RadioGroup name="pedalEdema" value={formData.pedalEdema} onChange={handleChange}>
        <div className='r-grp'>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          </div>
        </RadioGroup>
      <br></br>
      <FormLabel component="legend">Do you have anemia?</FormLabel>
      <RadioGroup name="anemia" value={formData.anemia} onChange={handleChange}>
      <div className='r-grp'>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
        </div>
      </RadioGroup>
      <br></br>
      </div>
    )}
      <Button variant="contained" style={{backgroundColor: '#e6445c'}}onClick={storeData}>
          Predict Results
        </Button>
        <br></br><br></br>
         <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Prediction Results</DialogTitle>
        <DialogContent>
          <DialogContentText>{prediction}</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to='/components/dexplore'>
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

export default Kidney;