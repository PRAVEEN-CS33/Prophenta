import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';

function Brain() {
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

  const handleUpload = () => {
    if (selectedImage) {
      setIsPredicting(true);
      const formData = new FormData();
      formData.append('image', selectedImage);

      axios
        .post('http://127.0.0.1:5000/braintu', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
          setAccuracy(response.data.accuracy);
          setClassName(response.data.class_name);

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

  return (
    <div className='pneumonia-cont'>
      <center><h1 className='uh'>Image Upload</h1></center>
      <div className="PApp">
        <div className="Pimage-box">
          <div className="Pcenter-box">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage ? null : <p>No image selected</p>}
            <Button variant='outlined' color='primary' onClick={handleUpload}>Predict Result
              {isPredicting && <CircularProgress size={20} style={{ marginLeft: '10px' }} />}
            </Button>
          </div>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="selected-image"
            />
          )}
        </div>
        {resultPredicted && (
          <div className="Presult-box">
            <div className="Presult">
              <h4>Result</h4>
            </div>
            Disease: {className}
            <br></br>
            Accuracy: {accuracy}
            {predictedImage && (
              <div className="predicted-image">
                <img
                  src={`data:image/jpeg;base64,${predictedImage}`}
                  alt="Predicted"
                  className="predicted-image"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Brain;
