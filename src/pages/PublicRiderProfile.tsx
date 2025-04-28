
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Button, Typography, Spin, Avatar, Space, Descriptions, Divider, Tag } from 'antd';
import { PhoneOutlined, WarningOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import { mockRiders } from '@/data/mockData';
import { toast } from 'sonner';

const { Title, Text } = Typography;

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

const PublicRiderProfile = () => {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const [rider, setRider] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch the rider data based on the sticker code
    // For demo purposes, we'll use the state passed from StickerVerification
    const riderId = location.state?.riderId;
    if (riderId) {
      const foundRider = mockRiders.find(r => r.id === riderId);
      if (foundRider) {
        setRider({
          ...foundRider,
          bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][Math.floor(Math.random() * 8)],
          emergencyContact: {
            name: 'Emergency Contact',
            relation: 'Family',
            phone: '+1 (555) 123-4567'
          }
        });
      }
    }
    setLoading(false);
  }, [code, location.state]);

  const handleEmergency = () => {
    // In a real app, this would send an alert to the admin
    toast.success("Emergency alert sent to club administrators");
    setEmergencyMode(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!rider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-none rounded-2xl">
          <div className="h-2 bg-cycling-red w-full" />
          <div className="p-8 text-center">
            <WarningOutlined className="text-4xl text-cycling-red mb-4" />
            <Title level={2}>Invalid Sticker Code</Title>
            <Text type="secondary" className="block mb-4">
              The sticker code provided is not valid or has expired.
            </Text>
            <Button 
              type="primary"
              onClick={() => window.location.href = '/sticker'}
            >
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="h-2 bg-cycling-red w-full" />
        <div className="text-center pt-8">
          <Avatar 
            size={96} 
            src={rider.profileImage}
            icon={!rider.profileImage && <UserOutlined />} 
            className="mb-4"
          />
          <Title level={2}>{rider.name}</Title>
          <Text type="secondary">Cycle Club Member #{rider.id}</Text>
        </div>
        
        <Divider />
        
        <Space direction="vertical" size="large" className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-100">
              <Space>
                <HeartOutlined className="text-cycling-red" />
                <Text strong>Blood Group</Text>
              </Space>
              <div className="text-lg font-bold mt-1">{rider.bloodGroup}</div>
            </Card>
            
            <Card className="bg-gray-100">
              <Text type="secondary">Sticker Code</Text>
              <div className="text-lg font-bold mt-1">{code}</div>
            </Card>
          </div>
          
          {emergencyMode && (
            <Card className="bg-red-50 border border-red-200">
              <Title level={5} className="text-cycling-red flex items-center">
                <PhoneOutlined className="mr-2" /> Emergency Contact
              </Title>
              <Descriptions column={1}>
                <Descriptions.Item label="Name">{rider.emergencyContact.name}</Descriptions.Item>
                <Descriptions.Item label="Relation">{rider.emergencyContact.relation}</Descriptions.Item>
                <Descriptions.Item label="Phone">
                  <Text strong>{rider.emergencyContact.phone}</Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
          
          <Button
            type={emergencyMode ? "default" : "primary"}
            danger={!emergencyMode}
            size="large"
            onClick={handleEmergency}
            disabled={emergencyMode}
            block
            className="py-6 rounded-xl"
          >
            {emergencyMode 
              ? 'Emergency Contact Revealed' 
              : 'Reveal Emergency Contact'}
          </Button>
        </Space>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            This is an emergency profile page for Cycle Club members.
            In case of emergency, press the button above to reveal contact information.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PublicRiderProfile;
