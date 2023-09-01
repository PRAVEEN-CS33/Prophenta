import React from 'react';
import { Container, Slider, Typography, Card, CardContent, Divider } from '@mui/material';
import './explore.css'; 

const BrDiseasePage = () => {
  const diseases = [
    {
      id: 1,
      name: 'Cancer-Related Complications',
      explanation: 'Cervical cancer and its treatment can lead to side effects and complications such as anemia, fatigue, pain, infection, and compromised immune function.'
    },
    {
      id: 2,
      name: 'Side Effects of Treatment',
      explanation: 'Cancer treatments like surgery, radiation, and chemotherapy can cause side effects such as nausea, vomiting, hair loss, and changes in appetite.',
    },

    {
        id: 3,
        name: 'Secondary Cancers',
        explanation: 'People with cervical cancer might be at risk of developing other types of cancers in the future, either due to common risk factors or as a consequence of treatment.',
      },
      {
        id: 4,
        name: 'Follow-up and Surveillance',
        explanation: ' After treatment, individuals require regular follow-up and surveillance to monitor for cancer recurrence, as well as to manage ongoing health concerns.',
      },
      {
        id: 5,
        name: 'Bone Health',
        explanation: ' Certain breast cancer treatments can affect bone health and increase the risk of osteoporosis.',
      }
    // Add more diseases here...
  ];

  const preventiveProtocols = [
    {
      id: 1,
      title: 'Breast Self-Exams',
// Provide the path to your image
      description: 'Perform regular breast self-exams to become familiar with the normal look and feel of your breasts. Report any changes or abnormalities to your healthcare provider.',
    },
    {
      id: 2,
      title: 'Mammograms',
 
      description: 'Follow recommended mammography guidelines based on your age, family history, and risk factors. Mammograms can detect breast cancer in its early stages, even before symptoms develop.',
    },
    {
      id: 3,
      title: 'Breastfeeding',

      description: 'If possible, consider breastfeeding your baby. Breastfeeding may have a protective effect against breast cancer.',
    },
    {
      id: 4,
      title: 'Limit Alcohol Intake',

      description: 'If you choose to drink alcohol, do so in moderation. Limiting alcohol consumption can help reduce breast cancer risk.',
    }
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

export default BrDiseasePage;