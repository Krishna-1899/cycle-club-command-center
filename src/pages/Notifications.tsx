
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BellOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'system',
    title: 'System Maintenance',
    message: 'The system will be undergoing maintenance tonight from 12AM to 2AM.',
    date: '2023-08-10T15:30:00',
    read: false,
  },
  {
    id: 2,
    type: 'rider',
    title: 'New Rider Registration',
    message: 'John Smith has registered as a new rider. Please review their application.',
    date: '2023-08-09T10:15:00',
    read: true,
  },
  {
    id: 3,
    type: 'event',
    title: 'Upcoming Event',
    message: 'There is an upcoming event "Summer Ride" scheduled for August 15th.',
    date: '2023-08-08T09:45:00',
    read: false,
  },
  {
    id: 4,
    type: 'rider',
    title: 'Rider Updated Profile',
    message: 'Lisa Johnson has updated her emergency contact information.',
    date: '2023-08-07T14:20:00',
    read: true,
  },
  {
    id: 5,
    type: 'emergency',
    title: 'Emergency Alert',
    message: 'Rider Mark Davis has triggered an emergency alert. Contact required immediately.',
    date: '2023-08-06T08:10:00',
    read: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab);
      
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-black">Notifications</h1>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
            <Button variant="destructive" onClick={clearAll} disabled={notifications.length === 0}>
              Clear All
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all" className="rounded-md">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-md">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-md">
              System
            </TabsTrigger>
            <TabsTrigger value="rider" className="rounded-md">
              Riders
            </TabsTrigger>
            <TabsTrigger value="emergency" className="rounded-md">
              Emergency
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map(notification => (
                  <Card 
                    key={notification.id} 
                    className={`bg-white shadow-md rounded-xl overflow-hidden border-none transition-all ${
                      !notification.read ? 'border-l-4 border-l-cycling-red' : ''
                    }`}
                  >
                    <CardContent className="p-4 flex items-start justify-between">
                      <div className="flex gap-4 items-start">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'emergency' 
                            ? 'bg-red-100 text-cycling-red' 
                            : notification.type === 'system'
                              ? 'bg-blue-100 text-blue-500'
                              : 'bg-gray-100 text-gray-700'
                        }`}>
                          <BellOutlined className="text-lg" />
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="ml-2 bg-cycling-red text-white text-xs px-2 py-0.5 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDate(notification.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 rounded-full"
                          >
                            <CheckOutlined />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 rounded-full text-cycling-red"
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
                <CardContent className="p-8 text-center">
                  <BellOutlined className="text-4xl text-gray-300 mb-3" />
                  <h3 className="text-xl font-medium text-gray-600">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'all' 
                      ? "You don't have any notifications yet."
                      : `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications.`
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
