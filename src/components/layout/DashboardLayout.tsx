
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UserOutlined, HomeOutlined, BellOutlined, LogoutOutlined,
  MenuOutlined, CloseOutlined, RightOutlined, LeftOutlined
} from '@ant-design/icons';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeOutlined },
    { name: 'Riders', path: '/riders', icon: UserOutlined },
    { name: 'Notifications', path: '/notifications', icon: BellOutlined },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "bg-black text-white transition-all duration-300 ease-in-out hidden md:block",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo section */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            {!collapsed && (
              <h1 className="text-white font-bold text-lg truncate">
                Cycle Club
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto pt-5 px-2">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-white rounded-md transition-colors",
                        location.pathname === item.path 
                          ? "bg-cycling-red" 
                          : "hover:bg-gray-800"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center">
                {user?.name?.charAt(0) || 'A'}
              </div>
              {!collapsed && (
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              className={cn(
                "mt-4 text-white hover:bg-gray-800 w-full justify-start",
                collapsed && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogoutOutlined className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black text-white z-50 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </Button>
        <h1 className="text-white font-bold text-lg">Cycle Club</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8 bg-gray-700">
                <span className="text-white text-xs">{user?.name?.charAt(0) || 'A'}</span>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile sidebar - slide in */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <aside className="h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <nav className="flex-1 overflow-y-auto pt-20 px-2">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center px-4 py-3 text-white rounded-md transition-colors",
                          location.pathname === item.path 
                            ? "bg-cycling-red" 
                            : "hover:bg-gray-800"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Desktop header */}
        <header className="hidden md:flex items-center justify-end h-16 bg-white border-b border-gray-200 px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Avatar className="h-8 w-8 bg-gray-700">
                  <span className="text-white text-xs">{user?.name?.charAt(0) || 'A'}</span>
                </Avatar>
                <span className="ml-2">{user?.name || 'Admin User'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        <main className="p-6 pt-20 md:pt-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
