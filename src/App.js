import React, { useState } from 'react';
import axios from 'axios';

const BASE = 'https://email-verification-9wk8.onrender.com';

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    setMessage('Registering…');
    try {
      const res = await axios.post(`${BASE}/api/register`, form, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setMessage(err.response?.data?.error || err.message);
    }
  };

  const verify = () => {
    const url = `${BASE}/api/auth/verify?email=${encodeURIComponent(form.email)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Email Verification Test</h1>

      <form onSubmit={register} style={{ marginBottom: '1rem' }}>
        <h2>Register</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="worker">Worker</option>
        </select>
        <button type="submit" style={{ marginLeft: 8 }}>
          Register
        </button>
      </form>

      <div style={{ marginBottom: '1rem' }}>
        <h2>Verify</h2>
        <button onClick={verify} disabled={!form.email}>
          Open Verification Page for {form.email || '…'}
        </button>
      </div>

      {message && (
        <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
          {message}
        </pre>
      )}
    </div>
  );
}

export default App;