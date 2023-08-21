

import React from 'react';
import './App.css';
import Homescreen from './components/Homescreen';
import Create from './components/Create';
import Update from './components/Update';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {
  return(

    <div>
       <Router> 
            <Routes>
                <Route  path="/" element={<Homescreen/>} />
                <Route path="/create" element={<Create/>} />
                <Route path="/update/:id" element={<Update/> } />
            </Routes>
        </Router>

    </div>


  );
}

export  default App;
 




