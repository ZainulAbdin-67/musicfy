import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlists from './pages/Playlists';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector(state => state.auth);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      dispatch({ type: 'SET_TOKEN', payload: savedToken });
    }
  }, [dispatch, token]);

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
            <Route path="/playlists" element={isAuthenticated ? <Playlists /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
