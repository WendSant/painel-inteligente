
import "chart.js/auto";
import './index.css';
import React, {useEffect, useRef, useState} from 'react';
import Cirurgias from "./pages/Cirurgias";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PageTest from "./pages/PageTest";



function App() {

    return (
        <div className="w-full h-full bg-gray-200">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Cirurgias/>} />
                    <Route exact path="/test" element={<PageTest/>} />
                </Routes>
            </Router>
        </div>

);
}

export default App;
