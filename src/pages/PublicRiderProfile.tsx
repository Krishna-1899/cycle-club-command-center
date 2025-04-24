
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { mockRiders } from '@/data/mockData';
import { toast } from 'sonner';
import { PhoneOutlined, WarningOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';

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
        <p>Loading rider information...</p>
      </div>
    );
  }

  if (!rider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-none rounded-2xl">
          <div className="h-2 bg-cycling-red w-full" />
          <CardContent className="p-8 text-center">
            <WarningOutlined className="text-4xl text-cycling-red mb-4" />
            <h2 className="text-2xl font-bold mb-2">Invalid Sticker Code</h2>
            <p className="text-muted-foreground mb-4">
              The sticker code provided is not valid or has expired.
            </p>
            <Button 
              onClick={() => window.location.href = '/sticker'}
              className="bg-black hover:bg-gray-800"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl overflow-hidden">
        <div className="h-2 bg-cycling-red w-full" />
        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-gray-200 h-24 w-24 rounded-full flex items-center justify-center mb-4">
            {rider.profileImage ? (
              <img 
                src={rider.profileImage} 
                alt={rider.name} 
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <UserOutlined className="text-4xl text-gray-500" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">{rider.name}</CardTitle>
          <CardDescription>
            Cycle Club Member #{rider.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground mb-1">Blood Group</div>
              <div className="font-semibold flex items-center">
                <HeartOutlined className="text-cycling-red mr-2" /> {rider.bloodGroup}
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="text-sm text-muted-foreground mb-1">Sticker Code</div>
              <div className="font-semibold">{code}</div>
            </div>
          </div>
          
          {emergencyMode && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <h3 className="font-semibold text-cycling-red mb-2 flex items-center">
                <PhoneOutlined className="mr-2" /> Emergency Contact
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <strong>Name:</strong> {rider.emergencyContact.name}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Relation:</strong> {rider.emergencyContact.relation}
                </p>
                <p className="text-sm font-bold text-black">
                  <strong>Phone:</strong> {rider.emergencyContact.phone}
                </p>
              </div>
            </div>
          )}
          
          <Button
            onClick={handleEmergency}
            className={`w-full py-6 rounded-xl ${
              emergencyMode 
                ? 'bg-gray-300 hover:bg-gray-400'
                : 'bg-cycling-red hover:bg-red-700'
            } text-white`}
            disabled={emergencyMode}
          >
            {emergencyMode 
              ? 'Emergency Contact Revealed' 
              : 'Reveal Emergency Contact'}
          </Button>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          <p className="w-full">
            This is an emergency profile page for Cycle Club members.
            In case of emergency, press the button above to reveal contact information.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PublicRiderProfile;
