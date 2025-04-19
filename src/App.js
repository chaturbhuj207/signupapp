import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './components/ProfilePage';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';

function App() {
  const usertoken = localStorage.getItem('usertoken')
  
  console.log(usertoken)
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={!usertoken ? <Login /> : <Home />} />
        <Route path="/login" element={!usertoken ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!usertoken ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={usertoken ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
