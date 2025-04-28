
import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is just for demo purposes. In a real app, this would come from your API
      if (email === 'admin@example.com' && password === 'password123') {
        const user = {
          id: '1',
          name: 'Admin User',
          email,
          role: 'admin',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        message.success('Login successful!');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      message.error('Login failed: ' + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    message.info('You have been logged out');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
