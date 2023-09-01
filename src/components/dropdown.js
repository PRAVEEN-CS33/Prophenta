import React from 'react';
import './styles.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import aimg from './about-bg.jpg';
import cimg from './c-bg.png';
import simg from './skin.png'
import limg from './lung.png';
import eye from './eyedisease.png';
import corona from './corona.png';
import {Facebook, Instagram, Twitter } from '@mui/icons-material';

function Dropdown() {
  return (
    <div className="App-home">
      <div className="content-container">
        <section id="home" className="head-section">
        <div className='head-content'>
        <h1 className='headings'>PROPHENTA</h1>
        <div className='headings'>Unlocking the medical prophecies</div>
        <br></br>
        <Button variant='contained'  style={{ backgroundColor: '#eb7f67' }}>Get Started</Button>
        </div>
        <div className='dropdown-home'>
        <center><p>Choose an option to proceed...</p></center>
        <ul>
          <Link to="/components/land"><Button className='dbt' variant='contained' size='large' style={{ backgroundColor: '#ffffff',color:'black' }}>Diabetes Prediction</Button></Link>
          <br></br><br></br>
          <Link to="/components/land"><Button className='dbt' variant='contained' size='large' style={{ backgroundColor: '#ffffff',color:'black' }}>Lung Cancer Prediction</Button></Link>
          <br></br><br></br>
          <Link to="/components/land"><Button className='dbt' variant='contained' size='large' style={{ backgroundColor: '#ffffff',color:'black' }}>Cervical Cancer Prediction</Button></Link>
          <br></br><br></br>
          <Link to="/components/land"><Button className='dbt' variant='contained' size='large' style={{ backgroundColor: '#ffffff',color:'black' }}>Chronic Kidney Disease Prediction</Button></Link>
          <br></br><br></br>
          <Link to="/components/land"><Button className='dbt' variant='contained' size='large' style={{ backgroundColor: '#ffffff',color:'black' }}>Stroke Predicion</Button></Link>
          <br></br><br></br>
          <Link to="/components/land"><Button className='dbt' variant='contained' size='large' style={{ backgroundColor: '#ffffff',color:'black' }}>Breast Cancer Prediction</Button></Link>
        </ul>
      </div>
        </section>
        <section id="about" className="about-section">
        <div className="about-us-container">
        <div className='about-content'>
          <img className="abt-img" src={aimg} alt="About Us" />
        <div className="text-container">
        <div className="about-heading">
        <h2>Our Mission</h2>
        <p>
          At PROPHENTA, our mission is to revolutionize the healthcare industry through advanced data-driven technologies. We are committed to providing accurate and timely predictions for a range of diseases by harnessing the power of cutting-edge machine learning algorithms and comprehensive medical data.
        </p>
      </div>
      <div className="about-heading">
        <h2>Early Detection and Prevention</h2>
        <p>
          We recognize the critical importance of early disease detection and prevention. Prophenta's platform makes proactive healthcare accessible to everyone, facilitating timely interventions and personalized medical guidance. Through innovation and excellence, we strive to build a healthier future where diseases are predicted, understood, and ultimately conquered.
        </p>
      </div>
      <div className="about-heading">
      <h2>Team of Enthusiasts</h2> 
<p>
      Our dedicated team comprises a group of passionate and ambitious students who constantly strive to improve and refine our prediction models. As we proudly release the beta version, we remain unwavering in our efforts to enhance the platform and provide actionable insights for individuals, healthcare providers, and researchers. Together, we are driven by our enthusiasm to contribute to improved patient outcomes and public health.
      </p></div>
      <div className="about-heading">
        <h2>Join Our Mission</h2>
        <p>
          We invite you to join us in our mission to transform healthcare. Together, we can make a lasting impact on global well-being by shaping a world where proactive disease prediction is a reality. At Prophenta, we are dedicated to fostering innovation, research, and collaboration to create a brighter and healthier tomorrow.
        </p>
      </div>
        </div>
      </div>
      </div>
      </section>
      <section id="novelty" className="novelty-section">
      <center><h1 className='nhead'>NOVELTY</h1></center>
      <div className="novelty-container">
        <div className="novelty-row">
          <div className="novelty-box">
            <h2>User-Friendly Visualization</h2>
            <p>Our platform boasts user-friendly visualizations, simplifying complex data into clear insights. With interactive user interface, users can effortlessly grasp valuable information and make informed decisions.</p>
          </div>
          <div className="novelty-box">
            <h2>Exploring Associated Diseases</h2>
            <p>Delve into connected health conditions effortlessly with our feature for exploring associated diseases. Uncover intricate relationships and potential correlations between different ailments, empowering proactive healthcare strategies.</p>
          </div>
          <div className="novelty-box">
            <h2>Real-Time Monitoring Alerts</h2>
            <p>Receive instant updates and alerts through our real-time monitoring system. Stay informed about critical changes and take timely actions for better health management.</p>
          </div>
        </div>
        <div className="novelty-row">
          <div className="novelty-box">
            <h2>Early Intervention and Detection</h2>
            <p>Enable proactive care through early intervention and detection capabilities. Our platform empowers timely identification of potential health issues, fostering better outcomes and well-being.</p>
          </div>
          <div className="novelty-box">
            <h2>OCR Technology for Data Extraction</h2>
            <p>Leverage advanced OCR technology for seamless data extraction. Effortlessly transform printed or handwritten documents into digital information, streamlining data input and enhancing efficiency.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="skin" className="about-section">
        <div className="about-container">
        <div className='about-content'>
          <img className="abt-img" src={simg} alt="Skin cancer" />
        <div className="text-container">
        <div className="a-heading">
        <h2>Predicting Skin Diseases </h2>
        <p>
        Our innovative skin disease prediction system harnesses the power of sophisticated image analysis and state-of-the-art machine learning techniques. By precisely diagnosing and categorizing a wide range of skin conditions,Our solution not only enhances diagnostic accuracy but also streamlines the medical workflow, ensuring that healthcare providers can focus on delivering the best care possible. With a commitment to staying at the forefront of medical technology, we are dedicated to improving patient outcomes and revolutionizing skin disease prediction.
        </p>
      </div>
      </div>
      </div>
      </div>
      </section>
      <section id="lung" className="lung-section">
        <div className="lung-container">
        <div className='about-content'>
        <div className="a-heading">
        <h2>Lung Disease Diagnosis with Advance
        Image Analysis</h2>
        <p>
        Our pioneering solution harnesses the power of advanced image analysis and cutting-edge machine learning techniques to revolutionize the diagnosis of various lung diseases. By accurately identifying and categorizing a wide range of lung conditions, our system empowers medical professionals with rapid and dependable predictions. This technological breakthrough enables healthcare providers to administer prompt and effective treatments, enhancing patient care and outcomes. With a commitment to innovation, we're reshaping the landscape of lung disease diagnosis, providing unparalleled accuracy and contributing to the advancement of medical science.
        </p>
      </div>
      <img className="abt-img" src={limg} alt="Lung cancer" />
        <div className="text-container">
        
      </div>
      </div>
      </div>
      </section>
      <section id="corona" className="corona-section">
      <div className="about-container">
      <div className='about-content'>
        <img className="abt-img" src={corona} alt="Eye" />
      <div className="text-container">
      <div className="a-heading">
      <h2>Elevating COVID-19 Detection through Innovative AI and Image Analysis</h2>
      <p>In the fight against the COVID-19 pandemic, our innovative solution harnesses the capabilities of artificial intelligence and advanced image analysis. By analyzing medical images and data, our system can accurately detect and classify potential COVID-19 cases, aiding healthcare professionals in prompt and accurate diagnoses. This technology plays a crucial role in identifying affected individuals, enabling early intervention and mitigation strategies. With our commitment to public health, we're contributing to the global effort to combat the virus and protect communities. Together, we're using AI for a safer tomorrow.
      </p>
    </div>
    </div>
    </div>
    </div>
    </section>
      <section id="eye" className="lung-section">
        <div className="lung-container">
        <div className='about-content'>
        <div className="a-heading">
        <h2>Using AI to help doctors address eye disease</h2>
        <p>
        Age-related macular degeneration is the third largest cause of blindness across the globe. If caught early, however, vision loss can be slowed or saved. Our research, published in Nature Medicine, shows how our AI system can recommend—as accurately as world-leading experts—how patients should be referred for treatment for more than 50 eye diseases. Additional research also published in Nature Medicine shows a further improved AI model that has the potential to predict the development of wet AMD within six months.
        </p>
      </div>
          <img className="abt-img" src={eye} alt="Eye" />
        <div className="text-container">
        
      </div>
      </div>
      </div>
      </section>  
      
      <section id="eye" className="imp-section">
      <div className="lung-container">
        <div className='imp-content'>
        <div className="line"></div>
          <div className="line-paragraph">
            
            <h4>100k+</h4>
            <p>Annotations contributed, aiding the training and validation of our AI-based algorithms</p>
          </div>
          <div className="line"></div>
          <div className="line-paragraph">
            
            <h4>10+</h4>
            <p>Our project has been enriched by the invaluable contributions of more than 10 skilled medical professionals.</p>
          </div>
          <div className="line"></div>
          <div className="line-paragraph">
            
            <h4>98%+</h4>
            <p>Our dedication to excellence has led us to achieve an exceptional accuracy rate of over 95%. Through meticulous data analysis, sophisticated algorithms, and continuous refinement.</p>
          </div>
          <div className="line"></div>
          <div className="line-paragraph">
           
            <h4>Robust Security</h4>
            <p>At Prophecta, we prioritize the security and privacy of sensitive medical data. Our solution employs cutting-edge security measures to safeguard patient information and maintain the confidentiality of medical images and diagnoses.</p>
          </div>
        </div>
      </div>
    </section>
    

        <section id="contact" className="contact-section">
        <div className='contact-content'>
        <input type='text' placeholder='Username' required/>
        <br></br>
        <input type='text' placeholder='Email' required/>
        <br></br>
        <textarea
  placeholder="Message"
  style={{ width: '300px', height: '150px' }}
></textarea>



        <br></br>
        <Button variant='contained' color='primary'>Submit</Button>
        <div className='headings'>Email: prophentainfo@gmail.com</div>
        <div className='social-icons'>
        <div>Follow us at</div>
        <a href="https://twitter.com/your_twitter_profile" target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
        <a href="https://facebook.com/your_facebook_profile" target="_blank" rel="noopener noreferrer">
          <Facebook />
        </a>
        <a href="https://instagram.com/your_instagram_profile" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
      </div>
          <div className='con-text-container'></div>
          </div>
          <img className='cnt-img' src={cimg}></img>
          <div class="custom-box">
          <p>
          <h4>For more</h4>
             Need help with diagnostic test orders or patient test results
            from Prophenta Diagnostics? Please contact our Client Services team.
          </p>
          <p class="phone">888.244.7284</p>
          <p class="email">cs@prophenta.com</p>
        </div>
        </section>
      </div>
    </div>
  );
}

export default Dropdown;