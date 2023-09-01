import React from 'react';
import { Container, Slider, Typography, Card, CardContent, Divider } from '@mui/material';
import './explore.css'; // Import the external CSS file
import stress from './stress_relief.gif';
import alcohol from './alcohol.gif';
import check from './check-up-diabetes.png';
import echeck from './eye-checkup.gif';
import sleep from './sleep.jpg';
import weight from './weight.gif';
import happy from './happy.gif';

const StrDiseasePage = () => {
  const diseases = [
    {
      id: 1,
      name: 'Hypertension (High Blood Pressure)',
      explanation: 'Hypertension is a major risk factor for stroke. High blood pressure can damage blood vessels, making them more prone to rupture or blockage, leading to stroke.'
    },
    {
      id: 2,
      name: 'Atrial Fibrillation',
      explanation: 'Atrial fibrillation (AFib) is an irregular heart rhythm that can cause blood to pool in the heart, increasing the risk of blood clots. If a clot travels to the brain, it can cause a stroke.',
    },

    {
        id: 3,
        name: 'Coronary Artery Disease',
        explanation: "This condition involves the buildup of plaque in the coronary arteries that supply the heart. It's closely related to an increased risk of stroke.",
      },
      {
        id: 4,
        name: 'Peripheral Artery Disease',
        explanation: ' Peripheral artery disease is characterized by narrowed arteries outside the heart, often in the legs. It indicates a systemic issue and can increase stroke risk.',
      },
      {
        id: 5,
        name: 'Cognitive Impairments',
        explanation: 'Stroke can affect cognitive functions like memory, attention, and problem-solving.',
      },
      {
        id: 6,
        name: 'Sleep Disorders',
        explanation: 'Sleep disturbances like insomnia or sleep apnea may occur after a stroke.',
      }
    // Add more diseases here...
  ];

  const preventiveProtocols = [
    {
      id: 1,
      title: 'Have Proper Sleep',
      image: sleep, // Provide the path to your image
      description: 'Getting proper sleep is essential for overall well-being. It allows your body to recover, consolidate memories, and maintain cognitive function. Aim for 7-9 hours of quality sleep each night to support your physical and mental health.',
    },
    {
      id: 2,
      title: 'Stress Management',
      image: stress, // Provide the path to your image
      description: 'Practice stress-reduction techniques like meditation, deep breathing, and yoga.',
    },
    {
      id: 3,
      title: 'Weight Management',
      image: weight, // Provide the path to your image
      description: 'Effective weight management involves a combination of balanced nutrition and regular physical activity. Creating a sustainable eating plan that focuses on whole foods, appropriate portion sizes, and mindful eating can help you achieve and maintain a healthy weight. Incorporating both cardiovascular exercises and strength training into your routine further aids in weight management by increasing metabolism and building lean muscle mass',
    },

    {
      id: 4,
      title: 'Regular Eye checkups',
      image: happy, // Provide the path to your image
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

export default StrDiseasePage;






