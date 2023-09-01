import React from 'react';
import './App.css';

import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import PFooter from './components/PFooter';
import PNavbar from './components/PNavbar';
import PHome from './components/PHome';
import Imprint from './components/Imprint';
import TermsOfService from './components/TermsOfService';
import GeneralTermsAndConditions from './components/GeneralTermsandConditions';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import Dropdown from './components/dropdown';
import LoginPage from './components/login';
import RegisterForm from './components/signup';
import IconComponent from './components/icon';
import InputForm from './components/land';
import Lung from './components/abc';
import DiseasePage from './components/explore';
import DiaDiseasePage from './components/dexplore';
import StrDiseasePage from './components/sexplore';
import CerDiseasePage from './components/cexplore';
import BrDiseasePage from './components/bexplore';
import Image from './components/imgpred';
import BHome from './components/bothome';




function App() {
  return (
    <div>
      <Router>
      <PNavbar/>
        <Routes>
          <Route path='/' exact element={<PHome/>} />
          <Route path='/components/Imprint' exact element={<Imprint/>} />
          <Route path='/components/TermsOfService' exact element={<TermsOfService/>} />
          <Route path='/components/GeneralTermsAndConditions' exact element={<GeneralTermsAndConditions/>} />
          <Route path='/components/CookiePolicy' exact element={<CookiePolicy/>} />
          <Route path='/components/PrivacyPolicy' exact element={<PrivacyPolicy/>} />
          <Route path='/components/dropdown' exact element={<Dropdown/>}/>
          <Route path='/components/login' exact element={<LoginPage/>}/>
          <Route path='/components/signup' exact element={<RegisterForm/>}/>
          <Route path='/components/icon' exact element={<IconComponent/>}/>
          <Route path='/components/land' exact element={<InputForm/>}/>
          <Route path='/components/abc' exact element={<Lung/>}/>
          <Route path='/components/explore' exact element={<DiseasePage/>}/>
          <Route path='/components/dexplore' exact element={<DiaDiseasePage/>}/>
          <Route path='/components/sexplore' exact element={<StrDiseasePage/>}/>
          <Route path='/components/cexplore' exact element={<CerDiseasePage/>}/>
          <Route path='/components/bexplore' exact element={<BrDiseasePage/>}/>
          <Route path='/components/imgpred' exact element={<Image/>}/>
          <Route path="/components/bothome" element={<BHome />} />
        </Routes>
        <PFooter/>
      </Router>
    </div>
  );
}

export default App;