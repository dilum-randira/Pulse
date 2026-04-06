import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { hasMinPasswordLength, isValidEmail } from '../utils/validation';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  gender: '',
  interestedIn: '',
  bio: '',
};

function RegisterPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStepOne = () => {
    if (!formData.name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!hasMinPasswordLength(formData.password)) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    if (!formData.gender) {
      setError('Please choose your gender.');
      return false;
    }
    if (!formData.interestedIn) {
      setError('Please select who you are interested in.');
      return false;
    }

    return true;
  };

  const goToNextStep = () => {
    setError('');
    if (validateStepOne()) {
      setStep(2);
    }
  };

  const goToPrevStep = () => {
    setError('');
    setStep(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateStepTwo()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        ...formData,
        images: [],
        location: {
          type: 'Point',
          coordinates: [0, 0],
        },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to create account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 px-4 py-8">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-romantic-primary">Create account</p>
        <h1 className="mt-1 text-2xl font-bold text-romantic-accent">Start your Pulse journey</h1>
        <p className="mt-2 text-sm text-gray-600">Step {step} of 2</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {step === 1 ? (
            <>
              <label className="block text-sm font-medium text-gray-700">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2.5 outline-none focus:border-romantic-primary"
                  placeholder="Your name"
                  required
                />
              </label>

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
                  placeholder="At least 6 characters"
                  required
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <Button type="button" className="w-full" onClick={goToNextStep}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">
                Gender
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2.5 outline-none focus:border-romantic-primary"
                  required
                >
                  <option value="">Select one</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Interested In
                <select
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2.5 outline-none focus:border-romantic-primary"
                  required
                >
                  <option value="">Select one</option>
                  <option value="male">Men</option>
                  <option value="female">Women</option>
                  <option value="everyone">Everyone</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2.5 outline-none focus:border-romantic-primary"
                  placeholder="Tell people a little about yourself"
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="w-full" onClick={goToPrevStep}>
                  Back
                </Button>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
              </div>
            </>
          )}
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link className="font-semibold text-romantic-primary" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
