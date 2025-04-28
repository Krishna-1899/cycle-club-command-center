
import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
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

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/clubs',
      icon: <TeamOutlined />,
      label: <Link to="/clubs">Clubs</Link>,
    },
    {
      key: '/riders',
      icon: <TeamOutlined />,
      label: <Link to="/riders">Riders</Link>,
    },
    {
      key: '/notifications',
      icon: <BellOutlined />,
      label: <Link to="/notifications">Notifications</Link>,
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
      onClick: logout,
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
      >
        <div className="p-4 flex items-center justify-center">
          <h1 className="text-white font-bold text-xl">
            {collapsed ? 'CC' : 'Cycle Club'}
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
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
