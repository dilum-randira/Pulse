import RegisterForm from '../components/Auth/RegisterForm';
import RomanticDateIllustration from '../components/Auth/RomanticDateIllustration';

function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-pulse-light px-4 py-8">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-rose-100 bg-off-white shadow-lg md:flex-row">
        <div className="w-full md:w-1/2">
          <RegisterForm />
        </div>
        <div className="w-full md:w-1/2">
          <RomanticDateIllustration />
        </div>
      </div>
    </div>
  );
}

export default Register;
