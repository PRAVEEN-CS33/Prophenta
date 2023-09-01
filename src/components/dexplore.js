import React from 'react';
import { Container, Slider, Typography, Card, CardContent, Divider } from '@mui/material';
import './explore.css'; // Import the external CSS file
import stress from './stress_relief.gif';
import alcohol from './alcohol.gif';
import check from './check-up-diabetes.png';
import echeck from './eye-checkup.gif';

const DiaDiseasePage = () => {
  const diseases = [
    {
      id: 1,
      name: 'Cardiovascular Diseases',
      explanation: 'Heart disease, including conditions like coronary artery disease, heart attack, and stroke, is a significant concern for individuals with diabetes due to the increased risk of plaque buildup in blood vessels.'
    },
    {
      id: 2,
      name: 'Diabetic Nephropathy (Kidney Disease)',
      explanation: 'Damage to the kidneys filtering system can lead to kidney disease, which may progress to kidney failure, necessitating dialysis or transplantation.',
    },

    {
        id: 3,
        name: 'Diabetic Retinopathy',
        explanation: "Damage to the blood vessels in the retina can cause diabetic retinopathy, a leading cause of blindness among adults. It's essential for individuals with diabetes to have regular eye exams.",
      },
      {
        id: 4,
        name: 'Neuropathy (Nerve Damage)',
        explanation: 'Nerve damage can result in various symptoms like numbness, tingling, and pain in extremities. It can affect various bodily functions, leading to complications such as foot ulcers and digestive issues.',
      },
      {
        id: 5,
        name: 'Hypertension (High Blood Pressure)',
        explanation: 'High blood pressure is common in people with diabetes and significantly increases the risk of cardiovascular complications.',
      },
      {
        id: 6,
        name: 'Foot Complications',
        explanation: 'Poor blood circulation and nerve damage in the feet can lead to foot ulcers, infections, and a heightened risk of amputation.',
      }
    // Add more diseases here...
  ];

  const preventiveProtocols = [
    {
      id: 1,
      title: 'Regular Check-ups for Blood Sugar Control',
      image: check, // Provide the path to your image
      description: 'Regularly visit your healthcare provider to monitor nerve function and address any concerns  Keeping blood sugar levels within target ranges helps prevent nerve damage.',
    },
    {
      id: 2,
      title: 'Stress Management',
      image: stress, // Provide the path to your image
      description: 'Practice stress-reduction techniques like meditation, deep breathing, and yoga.',
    },
    {
      id: 3,
      title: 'Regular Kidney Function Monitoring',
      image: alcohol, // Provide the path to your image
      description: 'Undergo regular kidney function tests to detect any early signs of kidney disease. Minimize the use of over-the-counter pain medications that can be harmful to kidneys if overused.',
    },

    {
      id: 4,
      title: 'Regular Eye checkups',
      image: echeck, // Provide the path to your image
      description: 'Schedule regular eye exams with an eye specialist to monitor and manage diabetic retinopathy.',
    },
    // Add more preventive protocols with images here...
  ];


  return (
    <div className='sec1'>
    <Container>
    <div >
      <Typography variant="h4" gutterBottom style={{color:'white'}}>
        Associated Diseases
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

export default DiaDiseasePage;






