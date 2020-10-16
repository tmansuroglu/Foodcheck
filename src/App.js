import React from "react";
import "./App.css";

import "antd/dist/antd.css";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./container/LoginPage/LoginPage";
import RegisterPage from "./container/RegisterPage/RegisterPage";
import DietPage from "./container/DietPage/DietPage";
import HomePage from "./container/HomePage/HomePage";
import AboutPage from "./container/AboutPage/AboutPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/diet" component={DietPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Router>
    );
}

export default App;

//<a href='https://www.freepik.com/photos/food'>Food photo created by wayhomestudio - www.freepik.com</a>
