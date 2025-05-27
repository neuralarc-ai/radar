import React, { useState } from 'react';
import logoStacked from '../assests/logo-horizontal.png';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { MinimalFooter } from '../components/Footer';
import backgroundImage from '../assests/background.png';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // const navigate = useNavigate(); // No redirect on sign up

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });
      
    if (signUpError) {
        // Handle specific Supabase error cases
        if (signUpError.message.includes('network')) {
          setError('Network error: Please check your internet connection and try again.');
        } else if (signUpError.message.includes('500')) {
          setError('Server error: Please try again in a few moments.');
        } else {
      setError(signUpError.message);
        }
    } else {
      setSuccess(true); // Show confirmation message
      }
    } catch (err) {
      // Handle unexpected errors
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Network error: Please check your internet connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Signup error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setLoading(true);
    setError('');
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    setLoading(false);
    if (oauthError) setError(oauthError.message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFAF8] grain-texture">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center">
          <Link to="/">
            <img src={require('../assests/Radar_H.png')} alt="Radar Logo" className="w-[105px] h-[54px] object-contain" />
          </Link>
        </div>
      </nav>
      
      <div className="w-full flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-[564px] bg-[#FFFFFF] rounded-2xl p-8 border border-[#FFFFFF]/5 border-[1.5px] mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#000000]">Create Your Radar Account</h1>
          {success ? (
            <div className="text-green-500 text-center mb-4">
              Account created! Please check your email to confirm your account before logging in.
            </div>
          ) : (
            <>
              <form className="space-y-5 p-4"  onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 bg-[#D4CDC9] rounded-[8px]'>
                <div className="p-6 pb-0">
                  <label className="block text-sm font-medium mb-1 text-[#000000]">Full Name</label>
                  <input name="name" type="text" className="w-full px-4 py-3 rounded-lg bg-[#ffffff] border border-[#000000]/5 text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000]/20 transition" placeholder="Your Name" value={form.name} onChange={handleChange} />
                </div>
                <div className="p-6 py-0">
                  <label className="block text-sm font-medium mb-1 text-[#000000]">Email</label>
                  <input name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-[#ffffff] border border-[#000000]/5 text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000]/20 transition" placeholder="you@email.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="p-6 py-0">
                  <label className="block text-sm font-medium mb-1 text-[#000000]">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 pr-12 rounded-lg bg-[#ffffff] border border-[#000000]/5 text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000]/20 transition"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        // Eye-off SVG
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 16.338 7.24 19.5 12 19.5c1.658 0 3.237-.336 4.646-.94m3.374-2.14A10.45 10.45 0 0022.066 12c-1.292-4.337-5.306-7.5-10.066-7.5-1.272 0-2.496.192-3.646.547m7.646 6.953a3 3 0 11-4.242-4.242m4.242 4.242L3 3" />
                        </svg>
                      ) : (
                        // Eye SVG
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.226 7.662 7.24 4.5 12 4.5c4.76 0 8.774 3.162 9.964 7.183.07.234.07.486 0 .72C20.774 16.338 16.76 19.5 12 19.5c-4.76 0-8.774-3.162-9.964-7.183z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-6 py-0">
                  <label className="block text-sm font-medium mb-1 text-[#000000]">Confirm Password</label>
                  <div className="relative">
                    <input
                      name="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      className="w-full px-4 py-3 pr-12 rounded-lg bg-[#ffffff] border border-[#000000]/5 text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000]/20 transition"
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]"
                      tabIndex={-1}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? (
                        // Eye-off SVG
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 16.338 7.24 19.5 12 19.5c1.658 0 3.237-.336 4.646-.94m3.374-2.14A10.45 10.45 0 0022.066 12c-1.292-4.337-5.306-7.5-10.066-7.5-1.272 0-2.496.192-3.646.547m7.646 6.953a3 3 0 11-4.242-4.242m4.242 4.242L3 3" />
                        </svg>
                      ) : (
                        // Eye SVG
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.226 7.662 7.24 4.5 12 4.5c4.76 0 8.774 3.162 9.964 7.183.07.234.07.486 0 .72C20.774 16.338 16.76 19.5 12 19.5c-4.76 0-8.774-3.162-9.964-7.183z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                </div>
                <div 
                  className="login-buttons flex gap-4 w-full p-4 rounded-b-[12px] mt-8"
                  style={{ 
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#E8E8E8]  text-[#322B25] font-semibold shadow hover:bg-[#322B25]/10 hover:border-[#322B25] transition-all duration-200 text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                      <g>
                        <path fill="#000000" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.87-6.87C35.64 2.39 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.01 6.22C12.33 13.13 17.68 9.5 24 9.5z"/>
                        <path fill="#000000" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"/>
                        <path fill="#000000" d="M10.7 28.66c-1.01-2.99-1.01-6.23 0-9.22l-8.01-6.22C.68 17.82 0 20.81 0 24c0 3.19.68 6.18 1.89 8.78l8.81-6.89z"/>
                        <path fill="#000000" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.32 0-11.67-3.63-13.3-8.66l-8.81 6.89C6.73 42.52 14.82 48 24 48z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                      </g>
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-lg font-semibold bg-[#322B25] text-white hover:bg-[#4A3A2A] transition-all duration-200 disabled:opacity-60"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>
              <div className="my-6 flex items-center gap-2">
                <div className="flex-1 h-px bg-[#6C6C6C]/30" />
                <span className="text-xs text-[#868686]">or sign up with</span>
                <div className="flex-1 h-px bg-[#6C6C6C]/30" />
              </div>
              <div className="flex justify-center mb-4 p-4 rounded-b-[12px] bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
                <button
                  onClick={() => handleOAuth('google')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#E8E8E8] border border-[#6C6C6C]/40 text-[#322B25] font-semibold s hover:bg-[#FFFFFF]  transition-all duration-200 text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <g>
                      <path fill="#000000" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.87-6.87C35.64 2.39 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.01 6.22C12.33 13.13 17.68 9.5 24 9.5z"/>
                      <path fill="#000000" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"/>
                      <path fill="#000000" d="M10.7 28.66c-1.01-2.99-1.01-6.23 0-9.22l-8.01-6.22C.68 17.82 0 20.81 0 24c0 3.19.68 6.18 1.89 8.78l8.81-6.89z"/>
                      <path fill="#000000" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.32 0-11.67-3.63-13.3-8.66l-8.81 6.89C6.73 42.52 14.82 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </g>
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <Link to="/signin" className="text-[#6C6C6C] hover:underline">Already have an account?</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full">
        <MinimalFooter />
      </div>
    </div>
  );
};

export default SignUp; 