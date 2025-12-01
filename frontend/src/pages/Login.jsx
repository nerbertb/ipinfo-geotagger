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
      //http://localhost:8000/api/login
      const res = await axios.post('https://ipinfo-geotagger.onrender.com/api/login', {
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
    <div className="h-screen w-full flex flex-col justify-center items-center gap-10">
       
      <h2 className='poppins-extrabold text-5xl '>Welcome!</h2>
       <div className='w-[50%] lg:w-[25%]'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <p className='text-[12px] text-gray-500 mb-2'>Email</p>
        <input
          type="email"
          placeholder="example@mail.com"
          onChange={(e) => setEmail(e.target.value)}
          className='border-b-2 mb-4'
        />
        <p className='text-[12px] text-gray-500 mb-2'>Password</p>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
          className='border-b-2 mb-10'
        />
        <button type="submit" className='bg-black text-white rounded-xl h-12'>Login</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
