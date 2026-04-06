import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { hasMinPasswordLength, isValidEmail } from '../utils/validation';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!hasMinPasswordLength(formData.password)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to log in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-romantic-primary">Welcome back</p>
        <h1 className="mt-1 text-3xl font-bold text-romantic-accent">Find your spark on Pulse</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue matching and messaging.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2.5 outline-none focus:border-romantic-primary"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2.5 outline-none focus:border-romantic-primary"
              placeholder="••••••••"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Log in'}
          </Button>
        </form>

        <div className="mt-6 rounded-xl bg-rose-50 p-4">
          <p className="text-sm text-gray-700">New here?</p>
          <p className="mt-1 text-lg font-semibold text-romantic-accent">Join Pulse and meet someone special.</p>
          <Link to="/register" className="mt-3 inline-block">
            <Button variant="outline">Join Pulse</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
