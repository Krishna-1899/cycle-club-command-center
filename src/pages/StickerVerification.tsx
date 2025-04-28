
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography, Space, Spin } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { mockRiders } from '@/data/mockData';
import { toast } from 'sonner';

const { Title, Paragraph, Text } = Typography;

const StickerVerification = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API verification delay
    setTimeout(() => {
      // For demo purposes, we'll consider any 6-digit code valid
      // and link it to a random rider
      if (code.length === 6 && /^\d+$/.test(code)) {
        const randomIndex = Math.floor(Math.random() * mockRiders.length);
        const riderId = mockRiders[randomIndex].id;
        navigate(`/sticker/profile/${code}`, { 
          state: { riderId } 
        });
      } else {
        toast.error("Invalid sticker code. Please try again.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="h-2 bg-cycling-red w-full mb-6" />
        <div className="text-center mb-6">
          <Title level={2}>Cycle Club Sticker Verification</Title>
          <Paragraph type="secondary">
            Enter the unique code from your sticker to access rider information
          </Paragraph>
        </div>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-100">
                <SafetyOutlined className="text-cycling-red text-3xl" />
              </div>
            </div>
            
            <Input
              type="text"
              placeholder="Enter 6-digit sticker code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center text-xl tracking-widest py-6 border-2"
              maxLength={6}
              size="large"
              required
            />
          </div>
          
          <Button 
            type="primary"
            htmlType="submit" 
            className="w-full bg-cycling-red hover:bg-red-700"
            loading={loading}
            size="large"
          >
            {loading ? "Verifying..." : "Verify Sticker"}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <Space direction="vertical" size={2}>
            <Text type="secondary">
              This verification system is for emergency purposes only.
            </Text>
            <Text type="secondary">
              For club members, please use the <a href="/login" className="text-cycling-red hover:underline">admin login</a>.
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default StickerVerification;
