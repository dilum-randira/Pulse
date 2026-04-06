import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Feed from './pages/Feed';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function HomeRedirect() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-rose-50" />;
  }

  return <Navigate to={token ? '/dashboard' : '/login'} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Feed />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
