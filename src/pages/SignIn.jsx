import React, { useState } from 'react';
import logoStacked from '../assests/logo-horizontal.png';
import radarLogoPng from '../assests/Radar_H.png';
import neuralarcLogo from '../assests/neuralarc-logo.png';
import footerImage from '../assests/preview01.png';
import LoginCard from '../assests/Login_card.png';
import SignupCard from '../assests/Login_card01.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { MinimalFooter } from '../components/Footer';
import GradientImage from '../assests/Gradient_image.png';  

const SignIn = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('login');

  // Login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Signup state
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Login handlers
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    setLoginLoading(false);
    if (signInError) {
      setLoginError(signInError.message);
    } else {
      navigate('/dashboard');
    }
  };

  // Signup handlers
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirm) {
      setSignupError('All fields are required.');
      return;
    }
    if (signupForm.password !== signupForm.confirm) {
      setSignupError('Passwords do not match.');
      return;
    }
    setSignupLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: { data: { name: signupForm.name } },
      });
      if (signUpError) {
        if (signUpError.message.includes('network')) {
          setSignupError('Network error: Please check your internet connection and try again.');
        } else if (signUpError.message.includes('500')) {
          setSignupError('Server error: Please try again in a few moments.');
        } else {
          setSignupError(signUpError.message);
        }
      } else {
        setSignupSuccess(true);
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setSignupError('Network error: Please check your internet connection and try again.');
      } else {
        setSignupError('An unexpected error occurred. Please try again.');
        console.error('Signup error:', err);
      }
    } finally {
      setSignupLoading(false);
    }
  };

  // OAuth handler (shared)
  const handleOAuth = async (provider) => {
    setLoginLoading(true);
    setLoginError('');
    setSignupError('');
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    setLoginLoading(false);
    setSignupLoading(false);
    if (oauthError) {
      setLoginError(oauthError.message);
      setSignupError(oauthError.message);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetMsg('');
    setLoginError('');
    setLoginLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail);
    setLoginLoading(false);
    if (resetError) setLoginError(resetError.message);
    else setResetMsg('Password reset email sent!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFAF8] grain-texture">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center">
          <Link to="/">
            <img src={radarLogoPng} alt="Radar Logo" className="w-[105px] h-[54px] object-contain" />
          </Link>
        </div>
      </nav>
      
      {/* Main Content Wrapper */}
      <div className="flex items-center max-w-[1440px] mx-auto justify-center px-4 py-12 w-full">
        {/* Left Card */}
        <div className="hidden lg:flex h-[calc(100vh-144px)] min-w-[634px] justify-center items-center pr-12">
          <img 
            src={activeTab === 'login' ? LoginCard : SignupCard}
            alt={activeTab === 'login' ? 'Login illustration' : 'Sign up illustration'} 
            className="w-full h-full object-cover rounded-2xl shadow-lg transition-opacity duration-300"
          />
        </div>
        
        {/* Form Section */}
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div 
            className="flex mb-4"
            style={{
              width: '264px',
              height: '54px',
              borderRadius: '8px',
              padding: '4px',
              backgroundColor: '#E8E8E8',
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.04)'
            }}
          >
            <button
              className={`flex-1 rounded-l-lg font-semibold  ${activeTab === 'login' ? 'bg-[#322B25] text-white' : 'bg-[#E8E8E8] text-[#322B25]'}`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
            <button
              className={`flex-1 rounded-r-lg font-semibold  ${activeTab === 'signup' ? 'bg-[#322B25] text-white' : 'bg-[#E8E8E8] text-[#322B25]'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          {/* Form Container */}
          <div 
            className="bg-[#FBFBFB]"
            style={{
              width: '564px',
              borderRadius: '16px',
            }}
          >
            {/* Login Form */}
            {activeTab === 'login' && (
              <form className="w-full flex flex-col gap-6" onSubmit={handleLoginSubmit}>
                <div className="p-6 pb-0">
                  <label className="block text-sm font-medium mb-1 text-[#322B25]">User Name</label>
                  <input name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-[#F5EFEB] border border-[#E2E2E2] text-[#322B25] focus:outline-none transition" placeholder="Johndoe" value={loginForm.email} onChange={handleLoginChange} />
                </div>
                <div className='p-6 py-0'>
                  <label className="block text-sm font-medium mb-1 text-[#322B25]">Password</label>
                  <input name="password" type="password" className="w-full px-4 py-3 rounded-lg bg-[#F5EFEB] border border-[#E2E2E2] text-[#322B25] focus:outline-none transition" placeholder="********" value={loginForm.password} onChange={handleLoginChange} />
                </div>
                {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}
                <div className="flex justify-between items-center text-sm mb-2 px-6">
                  <span className="text-[#322B25] opacity-60 cursor-pointer">Forgot password?</span>
                </div>
                <div className="login-buttons flex gap-4 w-full p-4 rounded-b-[12px] mt-8 bg-no-repeat bg-center" style={{ backgroundImage: `url(${GradientImage})` }}>
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[4px] border border-[#322B25]/10 text-[#322B25] font-semibold hover:bg-[#FFFFFF] transition-all duration-200 text-base" onClick={() => handleOAuth('google')}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' className="w-5 h-5"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.87-6.87C35.64 2.39 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.01 6.22C12.33 13.13 17.68 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.7 28.66c-1.01-2.99-1.01-6.23 0-9.22l-8.01-6.22C.68 17.82 0 20.81 0 24c0 3.19.68 6.18 1.89 8.78l8.81-6.89z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.32 0-11.67-3.63-13.3-8.66l-8.81 6.89C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
                    Sign in with Google
                  </button>
                  <button type="submit" className="flex-1 py-3 rounded-[4px] font-semibold bg-[#2B2521] text-white  transition-all duration-200">{loginLoading ? 'Logging In...' : 'Log In'}</button>
                </div>
              </form>
            )}
            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form className="w-full flex flex-col gap-6" onSubmit={handleSignupSubmit}>
                <div className="p-6 pb-0"> 
                  <label className="block text-sm font-medium mb-1 text-[#322B25]">Full Name</label>
                  <input name="name" type="text" className="w-full px-4 py-3 rounded-lg bg-[#F5EFEB] border border-[#E2E2E2] text-[#322B25] focus:outline-none  transition" placeholder="Your Name" value={signupForm.name} onChange={handleSignupChange} />
                </div>
                <div className="p-6 py-0">
                  <label className="block text-sm font-medium mb-1 text-[#322B25]">Email</label>
                  <input name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-[#F5EFEB] border border-[#E2E2E2] text-[#322B25] focus:outline-none  transition" placeholder="you@email.com" value={signupForm.email} onChange={handleSignupChange} />
                </div>
                <div className="p-6 py-0">
                  <label className="block text-sm font-medium mb-1 text-[#322B25]">Password</label>
                  <input name="password" type="password" className="w-full px-4 py-3 rounded-lg bg-[#F5EFEB] border border-[#E2E2E2] text-[#322B25] focus:outline-none  transition" placeholder="********" value={signupForm.password} onChange={handleSignupChange} />
                </div>
                <div className="p-6 py-0">
                  <label className="block text-sm font-medium mb-1 text-[#322B25]">Confirm Password</label>
                  <input name="confirm" type="password" className="w-full px-4 py-3 rounded-lg bg-[#F5EFEB] border border-[#E2E2E2] text-[#322B25] focus:outline-none  transition" placeholder="********" value={signupForm.confirm} onChange={handleSignupChange} />
                </div>
                {signupError && <div className="text-red-500 text-sm text-center">{signupError}</div>}
                {signupSuccess && <div className="text-green-500 text-center mb-4">Account created! Please check your email to confirm your account before logging in.</div>}
                <div className="login-buttons flex gap-4 w-full p-4 rounded-b-[12px] mt-8" style={{background: 'radial-gradient(circle, #E7CDC1 0%, #6FC3D4 100%)'}}>
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#E8E8E8] border border-[#322B25]/10 text-[#322B25] font-semibold shadow hover:bg-[#322B25]/10 hover:border-[#322B25] transition-all duration-200 text-base" onClick={() => handleOAuth('google')}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' className="w-5 h-5"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.87-6.87C35.64 2.39 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.01 6.22C12.33 13.13 17.68 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.7 28.66c-1.01-2.99-1.01-6.23 0-9.22l-8.01-6.22C.68 17.82 0 20.81 0 24c0 3.19.68 6.18 1.89 8.78l8.81-6.89z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.32 0-11.67-3.63-13.3-8.66l-8.81 6.89C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
                    Sign up with Google
                  </button>
                  <button type="submit" className="flex-1 py-3 rounded-lg font-semibold bg-[#322B25] text-white hover:bg-[#4A3A2A] transition-all duration-200 disabled:opacity-60">{signupLoading ? 'Creating Account...' : 'Create Account'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {/* Footer (inline style from Terms.jsx) */}
      <footer className="bg-[#232323] py-4 px-4 relative rounded-[4px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <Link to="/terms" className="text-sm text-[#FFFFFF] hover:text-white"><u>Terms of Use</u></Link>
          <span className="text-[#FFFFFF]">•</span>
          <Link to="/privacy" className="text-sm text-[#FFFFFF] hover:text-white"><u>Privacy Policy</u></Link>
          <span className="text-[#FFFFFF]">•</span>
          <Link to="/responsible-ai" className="text-sm text-[#FFFFFF] hover:text-white"><u>Responsible AI</u></Link>
          <span className="text-[#FFFFFF]">•</span>
          <Link to="/disclaimer" className="text-sm text-[#FFFFFF] hover:text-white"><u>Disclaimer</u></Link>
          <span className="text-[#FFFFFF]">•</span>
          <span className="text-[#FFFFFF] text-sm">
            Copyright 2025. All rights reserved. <span className="font-bold">Radar</span>, A thing by <span className="font-bold">NeuralArc</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SignIn; 