
import React, { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Input, Button, Form, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser } from '../redux/slices/authSlice';
import { toast } from 'sonner';

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { email: string; password: string }) => {
    // Dispatch login action
    const resultAction = await dispatch(loginUser(values));
    
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login successful", {
        description: "Welcome to Cycle Club Command Center!",
        duration: 3000,
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card className="shadow-lg" bordered={false}>
          <div className="text-center mb-6">
            <Title level={2} className="text-gray-800">Cycle Club Command Center</Title>
            <Text type="secondary">Admin Dashboard Login</Text>
          </div>
          
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mb-4"
            />
          )}
          
          <Form
            name="login"
            initialValues={{ email: '', password: '' }}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                size="large"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Demo credentials: admin@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
