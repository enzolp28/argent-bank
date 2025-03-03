'use client';
import { FormEvent, useState } from 'react';
import './styles/SignIn.css';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../redux/auth/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/auth/slice';

const SignIn = () => {
  const [userEmail, setUserEmail] = useState('tony@stark.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email: userEmail, password }).unwrap();
      const token = result?.body?.token;
      
      // Store token based on remember me option
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      dispatch(setCredentials({ token }));
      router.push('/profile');
    } catch (err) {
      console.error('Failed to sign in:', err);
    }
  };

  return (
    <>
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {error && (
          <div className="error-message">
            Failed to sign in. Please check your credentials.
          </div>
        )}
        <button type="submit" className="sign-in-button" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </>
  );
};

export default SignIn;
