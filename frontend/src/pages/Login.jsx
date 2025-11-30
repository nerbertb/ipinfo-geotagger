import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      console.log('Login successful, token:', res.data.token);

      localStorage.setItem('token', res.data.token);

      navigate('/home');
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid Credentials');
    }
  }

  return (
    <div className="bg-gray-400">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Login;
