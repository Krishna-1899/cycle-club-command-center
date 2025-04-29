
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if on mobile screen
  const isMobile = window.innerWidth < 768;
  
  // Set collapsed to true on mobile by default
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleMenuClick = () => {
    // Collapse sidebar after menu click if on mobile
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard" onClick={handleMenuClick}>Dashboard</Link>,
    },
    {
      key: '/clubs',
      icon: <TeamOutlined />,
      label: <Link to="/clubs" onClick={handleMenuClick}>Clubs</Link>,
    },
    {
      key: '/riders',
      icon: <TeamOutlined />,
      label: <Link to="/riders" onClick={handleMenuClick}>Riders</Link>,
    },
    {
      key: '/notifications',
      icon: <BellOutlined />,
      label: <Link to="/notifications" onClick={handleMenuClick}>Notifications</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={240}
        className="shadow-lg"
        style={{ background: '#FFFFFF' }}
      >
        <div className="p-4 flex items-center justify-center">
          <h1 className="text-black font-bold text-xl">
            {collapsed ? 'CC' : 'Cycle Club'}
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="custom-menu"
        />
      </Sider>
      <Layout>
        <Header className="bg-white flex justify-between items-center px-4 shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
          />
          <div className="flex items-center gap-4">
            <Badge count={5} size="small">
              <Link to="/notifications">
                <BellOutlined className="text-xl" />
              </Link>
            </Badge>
            <Dropdown menu={{ items: userMenuItems }}>
              <div className="flex items-center cursor-pointer">
                <Avatar icon={<UserOutlined />} src={user?.avatar} />
                <span className="ml-2 hidden md:block">{user?.name || 'Admin User'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-6 overflow-auto bg-gray-50">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
