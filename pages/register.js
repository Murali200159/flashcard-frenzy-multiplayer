import { useState } from 'react';
import { supabase } from '../lib/supabase';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.log('📝 Starting registration for:', email);
      
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
      });
      
      console.log('📡 Registration response:', {
        hasUser: !!data?.user,
        hasError: !!authError,
        session: !!data?.session,
      });
      
      if (authError) {
        console.error('❌ Registration error:', authError);
        
        let errorMessage = 'Registration failed';
        switch (authError.message) {
          case 'Invalid email':
            errorMessage = 'Please enter a valid email address';
            break;
          case 'Password should be at least 6 characters':
            errorMessage = 'Password must be at least 6 characters long';
            break;
          case 'User already registered':
            errorMessage = 'This email is already registered. Please log in instead.';
            break;
          default:
            errorMessage = authError.message;
        }
        
        setError(errorMessage);
        return;
      }
      
      if (data?.user) {
        console.log('✅ Registration successful! User created:', data.user.email);
        
        // Auto-login if session exists
        if (data.session) {
          console.log('🔑 Auto-login successful');
          setSuccess('Registration successful! Logging you in...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          // Manual login
          console.log('🔑 Manual login after registration...');
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password,
          });
          
          if (loginError) {
            console.error('❌ Manual login error:', loginError);
            setError('Registration successful! Please log in with your new credentials.');
          } else {
            console.log('✅ Manual login successful');
            setSuccess('Welcome! Redirecting to dashboard...');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1500);
          }
        }
      } else {
        setError('Registration completed but user data missing. Please try logging in.');
      }
      
    } catch (networkError) {
      console.error('🌐 Network error during registration:', networkError);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] py-12">
        <div className="w-full max-w-md">
          {/* Registration Hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-2xl mx-auto">
              <span className="text-3xl">🎮</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Join the Frenzy!
            </h1>
            <p className="text-xl text-gray-600 font-medium">Create your player account</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  <span className="font-medium">
                    {error.includes('already registered') ? (
                      <>
                        This email is already registered.{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 underline">
                          Click here to log in
                        </Link>
                      </>
                    ) : (
                      error
                    )}
                  </span>
                </div>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center">
                  <span className="text-xl mr-2">✅</span>
                  <span className="font-medium">{success}</span>
                </div>
              </div>
            )}

            <form onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              const confirmPassword = e.target.confirmPassword.value;
              
              if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
              }
              
              if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
              }
              
              handleRegister(email, password);
            }}>
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="player@example.com"
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="At least 6 characters"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters with letters and numbers
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>🎮</span>
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-400 mb-1">1M+</div>
              <div className="text-xs text-gray-300">Players</div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
              <div className="text-xs text-gray-300">Live Games</div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-400 mb-1">🎮</div>
              <div className="text-xs text-gray-300">Free</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}