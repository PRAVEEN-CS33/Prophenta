import React ,{useState, useRef} from 'react';
import Pdf from "react-to-pdf";
import jsPDF from 'jspdf';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Diabetes = () => {
  const [prediction, setPrediction] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: ''

  });

  const handleDownload = () => {
    const pdf = new jsPDF();

    pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(255, 0, 0); // Set text color to red

  pdf.text('Diabetes Prediction Report', 10, 10);
  pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10, 'S'); // 'S' means stroke

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  const spacing = 10;
    const pdfContent = `Age: ${formData.age}\nPregnancies: ${formData.pregnancies}\nGlucose: ${formData.glucose}\nBlood Pressure: ${formData.bloodPressure}\nSkin Thickness: ${formData.skinThickness}\nInsulin: ${formData.insulin}\nBMI: ${formData.bmi}\nDiabetes Pedigree Function: ${formData.diabetesPedigreeFunction}\nPrediction Result: ${prediction}`;
    

    const lines = pdfContent.split('\n');
    lines.forEach((line, index) => {
      pdf.text(line, 10, 30 + (index * spacing));
    });
  
    pdf.save('dreport.pdf');
  };
  const ref = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const handlePredict = async (inputData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/diabetes", {
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
     return parseFloat(value);
    });
    await handlePredict(inputData);
    console.log(inputData);
  };

  const handleUploadClick = () => {
    setIsUploading(true);
  };

  const handleFileUpload = (event) => {
    // Handle file upload logic here
    // You can access the uploaded file using event.target.files[0]
  };

  return (
    <div ref={ref}>
    <center><h3 >Diabetes Prediction</h3></center>
    <div className='dia-cont'>
    <br></br>
    {isUploading ? (
      <div>
        <label>Upload File</label><br />
        <input type="file" accept=".csv,.xlsx,.txt" onChange={handleFileUpload} />
      </div>
    ) : (
      
      <div>
     
      <Button variant="outlined" color="primary" style={{marginLeft: '300px'}} onClick={handleUploadClick}>
      Upload File
      </Button>
      <br></br><br></br>
      <div ref={ref}>
      <label>Age</label><br></br>
      <input type="number" name='age' value={formData.age} placeholder="Age" onChange={handleChange}/>
      <br></br>
      <label>No.of Pregnancies</label><br></br>
      <input type="number" name='pregnancies' value={formData.pregnancies} placeholder="Pregnancies" onChange={handleChange} />
      <br></br>
      <label>Glucose Level</label><br></br>
      <input type="number" name='glucose' value={formData.glucose} placeholder="Glucose" onChange={handleChange}/>
      <br></br>
      <label>Blood Pressure</label><br></br>
      <input type="number" name='bloodPressure' value={formData.bloodPressure} placeholder="Blood Pressure" onChange={handleChange} />
      <br></br>
      <label>Skin Thickness</label><br></br>
      <input type="number" name='skinThickness' value={formData.skinThickness} placeholder="Skin Thickness" onChange={handleChange} />
      <br></br>
      <label>Insulin</label><br></br>
      <input type="number" name='insulin' value={formData.insulin} placeholder="Insulin" onChange={handleChange} />
      <br></br>
      <label>BMI</label><br></br>
      <input type="number" name='bmi' value={formData.bmi} placeholder="BMI" onChange={handleChange} />
      <br></br>
      <label>Diabetes Pedigree Function</label><br></br>
      <input type="number" name='diabetesPedigreeFunction' value={formData.diabetesPedigreeFunction} placeholder="Diabetes Pedigree Function" onChange={handleChange} />
      <br></br>
      </div></div>
      )}
      <div className='pr'>
      <Button variant="contained" style={{backgroundColor: '#e6445c'}} onClick={storeData}>
          Predict Results
        </Button>
        </div>
        <br></br><br></br>
        {prediction};
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
        <Pdf targetRef={ref} filename="Report.pdf" x={10} y={10}>
        {({ toPdf }) => (
          <Button  onClick={handleDownload} variant='contained' color='primary' style={{ marginLeft: '10px' }}>
            Get Report
          </Button>
        )}
</Pdf>
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

export default Diabetes;


// import React, { useState } from 'react';
// import jsPDF from 'jspdf';

// function Diabetes() {
//   const [field1, setField1] = useState('');
//   const [field2, setField2] = useState('');
//   const [field3, setField3] = useState('');
//   const [field4, setField4] = useState('');

//   const handleDownload = () => {
//     const pdf = new jsPDF();
//     const pdfContent = `Field 1: ${field1}\nField 2: ${field2}\nField 3: ${field3}\nField 4: ${field4}`;
//     pdf.text(pdfContent, 10, 10);
//     pdf.save('user_input.pdf');
//   };

//   return (
//     <div>
//       <label>Field 1:</label>
//       <input type="text" value={field1} onChange={e => setField1(e.target.value)} /><br /><br />

//       <label>Field 2:</label>
//       <input type="text" value={field2} onChange={e => setField2(e.target.value)} /><br /><br />

//       <label>Field 3:</label>
//       <input type="text" value={field3} onChange={e => setField3(e.target.value)} /><br /><br />

//       <label>Field 4:</label>
//       <input type="text" value={field4} onChange={e => setField4(e.target.value)} /><br /><br />

//       <button onClick={handleDownload}>Download PDF</button>
//     </div>
//   );
// }

// export default Diabetes;

















// import React ,{useState, useRef} from 'react';
// import Pdf from "react-to-pdf";
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// const Diabetes = () => {
//   const [prediction, setPrediction] = useState("");
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     age: '',
//     pregnancies: '',
//     glucose: '',
//     bloodPressure: '',
//     skinThickness: '',
//     insulin: '',
//     bmi: '',
//     diabetesPedigreeFunction: ''

//   });
//   const ref = useRef();
//   const [isUploading, setIsUploading] = useState(false);
//   const handlePredict = async (inputData) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/diabetes", {
//         data: inputData,
//       });
//       setPrediction(response.data.prediction);
//       setOpen(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const storeData = async () => {
//     const inputData = Object.values(formData).map(value => {
//      return parseFloat(value);
//     });
//     await handlePredict(inputData);
//     console.log(inputData);
//   };

//   const handleUploadClick = () => {
//     setIsUploading(true);
//   };

//   const handleFileUpload = (event) => {
//     // Handle file upload logic here
//     // You can access the uploaded file using event.target.files[0]
//   };

//   return (
//     <div ref={ref}>
//     <center><h3 >Diabetes Prediction</h3></center>
//     <div className='dia-cont'>
//     <br></br>
//     {isUploading ? (
//       <div>
//         <label>Upload File:</label><br />
//         <input type="file" accept=".csv,.xlsx,.txt" onChange={handleFileUpload} />
//       </div>
//     ) : (
      
//       <div>
//       <Pdf targetRef={ref} filename="Report.pdf" x={10} y={10}>
//               {({ toPdf }) => (
//                 <button onClick={toPdf} className="button">
//                   Get Report
//                 </button>
//               )}
//       </Pdf>
//       <Button variant="outlined" color="primary" style={{marginLeft: '300px'}} onClick={handleUploadClick}>
//       Upload File
//       </Button>
//       <br></br><br></br>
//       <div ref={ref}>
//       <label>Age: </label><br></br><br></br>
//       <input type="number" name='age' value={formData.age} placeholder="Age" onChange={handleChange}/>
//       <br></br>
//       <label>No.of Pregnancies:</label><br></br><br></br>
//       <input type="number" name='pregnancies' value={formData.pregnancies} placeholder="Pregnancies" onChange={handleChange} />
//       <br></br>
//       <label>Glucose Level:</label><br></br><br></br>
//       <input type="number" name='glucose' value={formData.glucose} placeholder="Glucose" onChange={handleChange}/>
//       <br></br>
//       <label>Blood Pressure:</label><br></br><br></br>
//       <input type="number" name='bloodPressure' value={formData.bloodPressure} placeholder="Blood Pressure" onChange={handleChange} />
//       <br></br>
//       <label>Skin Thickness: </label><br></br><br></br>
//       <input type="number" name='skinThickness' value={formData.skinThickness} placeholder="Skin Thickness" onChange={handleChange} />
//       <br></br>
//       <label>Insulin</label><br></br><br></br>
//       <input type="number" name='insulin' value={formData.insulin} placeholder="Insulin" onChange={handleChange} />
//       <br></br>
//       <label>BMI:</label><br></br><br></br>
//       <input type="number" name='bmi' value={formData.bmi} placeholder="BMI" onChange={handleChange} />
//       <br></br>
//       <label>Diabetes Pedigree Function</label><br></br>
//       <input type="number" name='diabetesPedigreeFunction' value={formData.diabetesPedigreeFunction} placeholder="Diabetes Pedigree Function" onChange={handleChange} />
//       <br></br>
//       </div></div>
//       )}
//       <Button variant="contained" color="success" style={{backgroundColor: '#e6445c'}} onClick={storeData}>
//           Predict Results
//         </Button>
//         <br></br><br></br>
//         <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Prediction Results</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{prediction}</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//         <Link to='/components/dexplore'>
//         <Button variant="contained" color="primary">
//           Explore
//         </Button>
//         </Link>
//           <Button onClick={handleClose} variant="contained" color="primary"  style={{ marginLeft: '10px' }}>
//             Close
//           </Button>
         
//         </DialogActions>
//         <p style={{ marginLeft: '10px' }}>*This is an ML model generated report.Kindly consult the doctor for further clarification</p>
//       </Dialog>
//         <br /><br />
//         </div>
//     </div>
//   );
// };

// export default Diabetes;

