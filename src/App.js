import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home';
import ContactDetails from './components/Home/ContactDetails';
import { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

function App() {

  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <LoadingBar color='blue' height={5} progress={progress}/>
      <Toaster />
      <Routes>
        <Route exact path='/register' element={<Register setProgress={setProgress}/>}/>
        <Route exact path='/login' element={<Login setProgress={setProgress}/>}/>
        <Route exact path='/home' element={<Home setProgress={setProgress}/>} />
        <Route exact path='/contact/:id' element={<ContactDetails setProgress={setProgress}/>} />
      </Routes>
    </Router>
  );
}

export default App;
