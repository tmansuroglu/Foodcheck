import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import loginPage from './container/loginPage';



function App() {
  return (
    <Router>
      <Navbar />
      {/* apply route thing to all pages */}
      <Route path="/login" exact component={loginPage} />
    </Router>

  )
}

export default App;
