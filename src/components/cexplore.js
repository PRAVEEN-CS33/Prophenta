import React from 'react';
import { Container, Slider, Typography, Card, CardContent, Divider } from '@mui/material';
import './explore.css'; 

const CerDiseasePage = () => {
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
        name: 'Emotional and Psychological Health',
        explanation: 'A cancer diagnosis can impact emotional and psychological well-being. Anxiety, depression, stress, and adjustment difficulties are common among cancer patients..',
      }
    // Add more diseases here...
  ];

  const preventiveProtocols = [
    {
      id: 1,
      title: 'Safe Sexual Practices',
// Provide the path to your image
      description: 'Practicing safe sex, including using condoms, can reduce the risk of HPV transmission and other sexually transmitted infections (STIs) that may increase cervical cancer risk.',
    },
    {
      id: 2,
      title: 'HPV Vaccination:',
 
      description: 'The HPV vaccine can protect against human papillomavirus (HPV) infection, a primary cause of cervical cancer. Vaccination is recommended for young individuals before they become sexually active.',
    },
    {
      id: 3,
      title: 'Smoking Cessation',

      description: '"Quit smoking, as it is associated with a higher risk of cervical cancer. Smoking weakens the immune system and increases the likelihood of HPV infection.',
    },
    {
      id: 4,
      title: 'Regular Pap Smear Tests',

      description: 'Schedule regular Pap smear tests (Pap tests) as recommended by your healthcare provider. Pap tests can detect precancerous changes in the cervix that can be treated before they develop into cancer.',
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

export default CerDiseasePage;