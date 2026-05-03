import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: 'LOGIN',
        payload: { token: response.data.token, user: response.data.user }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-500">🎵 Musicfy</h1>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account? <Link to="/register" className="text-green-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
