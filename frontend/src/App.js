import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage';
import HomePage from './pages/HomePage';
import VoterIDSearchPage from './pages/VoterIDSearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/details" element={<PersonalDetailsPage />} />
        <Route path="/searchpage" element={<VoterIDSearchPage />} />
      </Routes>
   
    </Router>
  );
}

export default App;
