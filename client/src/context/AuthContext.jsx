import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { connectSocket, disconnectSocket, getSocket } from '../api/socket';

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'pulseUser';
const TOKEN_STORAGE_KEY = 'pulseToken';

const normalizeAuthPayload = (payload) => {
  const { token: authToken, ...userData } = payload;
  return { authToken, userData };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!token || !user?._id) {
      return undefined;
    }

    const socket = connectSocket(token);
    socket?.emit('setup', { _id: user._id });

    return () => {
      const activeSocket = getSocket();
      if (activeSocket && !localStorage.getItem(TOKEN_STORAGE_KEY)) {
        disconnectSocket();
      }
    };
  }, [token, user]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { authToken, userData } = normalizeAuthPayload(response.data);

    setToken(authToken);
    setUser(userData);
    localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

    return response.data;
  };

  const register = async (formData) => {
    const response = await api.post('/auth/register', formData);
    const { authToken, userData } = normalizeAuthPayload(response.data);

    setToken(authToken);
    setUser(userData);
    localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

    return response.data;
  };

  const updateUser = (updatedUser) => {
    if (!updatedUser) return;

    setUser(updatedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    disconnectSocket();
    navigate('/login');
  };

  const value = useMemo(
    () => ({ user, token, isLoading, login, register, logout, updateUser }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
