import React, { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { message } from 'antd';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/${isLogin ? 'login' : 'register'}`;
    try {
      const { data } = await axios.post(url, form);
      if (data.success) {
        localStorage.setItem('token', data.data);
        isLogin ? navigate('/home') : message.success('User created successfully. Switching to login.');
        setIsLogin(true);
        setForm({ username: '', email: '', password: '' });
      }
    } catch (error) {
      console.error('Error while submitting form:', error);
      if(isLogin){
        message.error('Invalid email or password ');
      }
      else message.error('User already exist ');
    }
  };

  const toggleFormType = () => setIsLogin(!isLogin);

  return (
    <div className="loginSignup-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={form.username} onChange={handleChange} required />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
        </div>

        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

        <p onClick={toggleFormType}>
          {isLogin ? 'Sign up' : 'Login'}
        </p>
      </form>
    </div>
  );
};

export default Auth;
