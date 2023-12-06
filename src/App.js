import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { firebaseConfig } from './config/firebase';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import Register from './component/Register';
import Login from './component/Login';
import Courses from './component/Courses';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login app={app} />} />
          <Route path="register" element={<Register db={db}/>} />
          <Route path="courses" element={<Courses app={app}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
