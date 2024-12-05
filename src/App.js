import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from './component/Register';
import Login from './component/Login';
import Courses from './component/Courses';




function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="courses" element={<Courses/>} />
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
