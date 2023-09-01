import React from 'react';
import { Container, Slider, Typography, Card, CardContent, Divider } from '@mui/material';
import './explore.css'; // Import the external CSS file
import bimg from './balanced_diet.jpg';
import yimg from './yoga.gif';
import smoke from './smoking.gif';

const DiseasePage = () => {
  const diseases = [
    {
      id: 1,
      name: 'Cardiovascular Diseases',
      explanation: 'Lung diseases such as chronic obstructive pulmonary disease (COPD) and asthma can increase the risk of cardiovascular diseases like heart attack, stroke, and hypertension. The decreased lung function and inflammation associated with lung diseases can impact the heart and blood vessels.'
    },
    {
      id: 2,
      name: 'Gastroesophageal Reflux Disease (GERD)',
      explanation: 'Lung diseases can sometimes contribute to or worsen GERD, a condition in which stomach acid flows back into the esophagus.',
    },

    {
        id: 3,
        name: 'Osteoporosis',
        explanation: 'Individuals with lung diseases, especially those on long-term steroid treatment, may be at a higher risk of developing osteoporosis due to reduced bone density.',
      },
      {
        id: 4,
        name: 'Sleep Apnea',
        explanation: ' Some lung conditions, such as obstructive sleep apnea, can affect breathing during sleep and lead to disrupted sleep patterns.',
      },
      {
        id: 5,
        name: 'Metabolic Syndrome and Diabetes:',
        explanation: 'Chronic inflammation and certain medications used to treat lung diseases may contribute to the development of metabolic syndrome and type 2 diabetes..',
      }
    // Add more diseases here...
  ];

  const preventiveProtocols = [
    {
      id: 1,
      title: 'Healthy Diet',
      image: bimg, // Provide the path to your image
      description: 'Consume a diet rich in fruits, vegetables, whole grains, lean protein, and healthy fats. A balanced diet can support immune function and overall health.A balanced diet rich in fruits, vegetables, and whole grains can promote lung health and overall well-being.',
    },
    {
      id: 2,
      title: 'Regular Exercise',
      image: yimg, // Provide the path to your image
      description: 'Consume a diet rich in fruits, vegetables, whole grains, lean protein, and healthy fats. A balanced diet can support immune function and overall health.A balanced diet rich in fruits, vegetables, and whole grains can promote lung health and overall well-being.',
    },
    {
      id: 3,
      title: 'Avoid Smoking',
      image: smoke, // Provide the path to your image
      description: '"Quitting smoking is a vital step in preventing lung diseases. Smoking damages the lungs and increases the risk of conditions like COPD and lung cancer."',
    },
    {
      id: 4,
      title: 'Regular Exercise',
      image: yimg, // Provide the path to your image
      description: 'Consume a diet rich in fruits, vegetables, whole grains, lean protein, and healthy fats. A balanced diet can support immune function and overall health.A balanced diet rich in fruits, vegetables, and whole grains can promote lung health and overall well-being.',
    }
    // Add more preventive protocols with images here...
  ];


  return (
    <div className='sec1'>
    <Container>
    <div >
      <Typography variant="h4" gutterBottom style={{color:'white'}}>
        What people like you already have?
      </Typography>
      <Divider />
      <div className="adisease-container">
        {diseases.map((disease) => (
          <Card key={disease.id} className="adisease-card">
            <div className="slider-content">
              <Slider orientation="vertical" />
            </div>
            <CardContent className="acard-content">
              <div className="adisease-info">
                <Typography variant="h6" gutterBottom>
                  {disease.name}
                </Typography>
                <Typography variant="body2" className="adisease-text">
                  {disease.explanation}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
        
      <Typography variant="h4" gutterBottom className="protocols-heading" style={{color:'white'}}>
        Preventive Protocols
      </Typography>
      <Divider />
      <div className="preventive-protocols">
        {preventiveProtocols.reduce((rows, protocol, index) => {
          if (index % 2 === 0) {
            rows.push([protocol]);
          } else {
            rows[rows.length - 1].push(protocol);
          }
          return rows;
        }, []).map((row, rowIndex) => (
          <div key={rowIndex} className="protocol-row">
            {row.map((protocol) => (
              <Card key={protocol.id} className="protocol-card">
                <div className="protocol-image-container">
                  <img src={protocol.image} alt={protocol.title} className="protocol-image" />
                </div>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {protocol.title}
                  </Typography>
                  <Typography variant="body2" className="protocol-description">
                    {protocol.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </Container>
    </div>
  );
};

export default DiseasePage;






