
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockRiders } from '../data/mockData';
import { Phone, AlertTriangle, User } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const PublicRiderProfile = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  
  // Find rider by sticker code
  const rider = mockRiders.find(r => r.stickerCode === code);
  
  // Handle emergency button click
  const handleEmergency = () => {
    setShowEmergencyContact(true);
    
    // Simulate sending SMS alert
    toast({
      title: "Emergency Alert Sent",
      description: "An SMS alert has been sent to the club administrators",
      variant: "destructive",
    });
  };
  
  if (!rider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              Invalid Sticker Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              The sticker code provided does not match any registered rider.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/sticker')}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Rider Information</CardTitle>
          <CardDescription>Sticker Code: {code}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-cycling-blue flex items-center justify-center text-white text-2xl mb-4">
              <User size={40} />
            </div>
            <h2 className="text-xl font-bold text-center">{rider.fullName}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Blood Group</p>
              <p className="font-bold text-xl text-center">{rider.bloodGroup}</p>
            </div>
            
            {showEmergencyContact ? (
              <div className="mt-4 animate-pulse">
                <p className="text-sm text-muted-foreground">Emergency Contact</p>
                <a 
                  href={`tel:${rider.emergencyContact}`}
                  className="font-medium text-cycling-red hover:underline flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {rider.emergencyContact}
                </a>
              </div>
            ) : (
              <Alert className="bg-gray-100">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Emergency Contact</AlertTitle>
                <AlertDescription>
                  Press the emergency button below to reveal the emergency contact number and send an alert to club admins.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            onClick={handleEmergency} 
            variant="destructive" 
            className="w-full"
            disabled={showEmergencyContact}
          >
            {showEmergencyContact ? 'Emergency Alert Sent' : 'Emergency - Send Alert'}
          </Button>
          <Button 
            onClick={() => navigate('/sticker')} 
            variant="outline" 
            className="w-full"
          >
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PublicRiderProfile;
