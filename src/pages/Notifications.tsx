
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Card, 
  Tabs, 
  Button, 
  List, 
  Typography, 
  Badge, 
  Avatar, 
  Space,
  Popconfirm,
  message 
} from 'antd';
import { 
  BellOutlined, 
  DeleteOutlined, 
  CheckOutlined,
  WarningOutlined,
  UserOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';

const { Text, Title } = Typography;

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
    message.success('Notification marked as read');
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    message.success('All notifications marked as read');
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    message.success('Notification deleted');
  };
  
  const clearAll = () => {
    setNotifications([]);
    message.success('All notifications cleared');
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <BellOutlined style={{ color: '#1890ff' }} />;
      case 'rider':
        return <UserOutlined style={{ color: '#52c41a' }} />;
      case 'event':
        return <CalendarOutlined style={{ color: '#722ed1' }} />;
      case 'emergency':
        return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      default:
        return <BellOutlined />;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Title level={2}>Notifications</Title>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
            <Popconfirm
              title="Clear all notifications"
              description="Are you sure you want to clear all notifications?"
              onConfirm={clearAll}
              okText="Yes"
              cancelText="No"
              disabled={notifications.length === 0}
            >
              <Button danger disabled={notifications.length === 0}>
                Clear All
              </Button>
            </Popconfirm>
          </div>
        </div>
        
        <Tabs 
          defaultActiveKey="all" 
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { 
              key: 'all', 
              label: <>All ({notifications.length})</>, 
              children: null 
            },
            { 
              key: 'unread', 
              label: <>Unread ({unreadCount})</>, 
              children: null 
            },
            { 
              key: 'system', 
              label: 'System', 
              children: null 
            },
            { 
              key: 'rider', 
              label: 'Riders', 
              children: null 
            },
            { 
              key: 'emergency', 
              label: 'Emergency', 
              children: null 
            }
          ]}
        />
        
        <List
          dataSource={filteredNotifications}
          locale={{ emptyText: 'No notifications' }}
          renderItem={(notification) => (
            <List.Item
              key={notification.id}
              className={!notification.read ? 'border-l-4 border-l-red-500' : ''}
              actions={[
                !notification.read && (
                  <Button 
                    icon={<CheckOutlined />} 
                    onClick={() => markAsRead(notification.id)}
                  />
                ),
                <Button 
                  danger
                  icon={<DeleteOutlined />} 
                  onClick={() => deleteNotification(notification.id)}
                />
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={getNotificationIcon(notification.type)} 
                    className={notification.type === 'emergency' ? 'bg-red-100' : ''}
                  />
                }
                title={
                  <Space>
                    {notification.title}
                    {!notification.read && (
                      <Badge 
                        count="New" 
                        style={{ backgroundColor: '#ff4d4f' }} 
                      />
                    )}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Text>{notification.message}</Text>
                    <Text type="secondary" className="text-xs">
                      {formatDate(notification.date)}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
