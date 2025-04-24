
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, Home, Calendar, Bell, LogOut, 
  Menu, X, ChevronRight, ChevronLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Riders', path: '/riders', icon: Users },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo section */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            {!collapsed && (
              <h1 className="text-sidebar-foreground font-bold text-lg truncate">
                Cycle Club
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto pt-5 px-2">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-sidebar-foreground rounded-md transition-colors hover:bg-sidebar-accent",
                      location.pathname === item.path && "bg-sidebar-accent"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
                {user?.name?.charAt(0) || 'A'}
              </div>
              {!collapsed && (
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-sidebar-foreground opacity-70 truncate">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              className={cn(
                "mt-4 text-sidebar-foreground hover:bg-sidebar-accent w-full justify-start",
                collapsed && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
