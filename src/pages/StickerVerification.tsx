
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRiders } from '../data/mockData';
import { toast } from '../components/ui/use-toast';

const StickerVerification = () => {
  const [stickerCode, setStickerCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!stickerCode) {
      toast({
        title: "Error",
        description: "Please enter a sticker code",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const rider = mockRiders.find(r => r.stickerCode === stickerCode);
      
      if (rider) {
        navigate(`/sticker/profile/${stickerCode}`);
      } else {
        toast({
          title: "Invalid Sticker Code",
          description: "No rider found with this sticker code",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-cycling-blue">Cycle Club</CardTitle>
            <CardDescription>Sticker Verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                Enter the sticker code to view rider information in case of emergency
              </p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter sticker code (e.g., ST1234)"
                  value={stickerCode}
                  onChange={(e) => setStickerCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleVerify} 
                  disabled={isSubmitting}
                  className="bg-cycling-blue hover:bg-cycling-lightBlue"
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              For demonstration purposes, use: ST0000, ST0001, etc.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StickerVerification;
