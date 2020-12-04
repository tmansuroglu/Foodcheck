import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './container/LoginPage';
import RegisterPage from './container/RegisterPage';
import DietPage from './container/DietPage';
import HomePage from './container/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Route path='/' component={Navbar} />
      <Route path='/' exact component={HomePage} />
      <Route path='/diet' component={DietPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <Footer path='/' component={Footer} />
    </Router>
  );
}

export default App;
