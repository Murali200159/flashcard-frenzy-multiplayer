import { useState } from 'react';

export default function AuthForm({ onSubmit, error, loading = false, disabled = false, isRegister = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegister && password !== confirmPassword) {
      // This will be handled by parent component validation
      return;
    }
    
    if (!email.trim() || !password.trim()) return;
    
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {isRegister ? 'Email Address' : 'Email Address'}
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
            placeholder={isRegister ? 'player@example.com' : 'your@email.com'}
            required
            disabled={disabled}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <span className="text-lg">{isRegister ? '📧' : '📧'}</span>
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
            placeholder="At least 6 characters"
            required
            minLength={isRegister ? 6 : 1}
            disabled={disabled}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <span className="text-lg">🔒</span>
          </div>
        </div>
        {isRegister && (
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 6 characters with letters and numbers
          </p>
        )}
      </div>

      {/* Confirm Password Field (Registration Only) */}
      {isRegister && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100"
              placeholder="Confirm your password"
              required
              disabled={disabled}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="text-lg">🔐</span>
            </div>
          </div>
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled || loading}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
          loading || disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
        } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none`}
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
          </>
        ) : (
          <>
            <span>{isRegister ? '🎮' : '🚀'}</span>
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
          </>
        )}
      </button>
    </form>
  );
}