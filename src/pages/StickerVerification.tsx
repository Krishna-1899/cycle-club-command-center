
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { mockRiders } from '@/data/mockData';
import { toast } from 'sonner';
import { SafetyOutlined } from '@ant-design/icons';

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
        <div className="h-2 bg-cycling-red w-full" />
        <CardHeader className="space-y-1 text-center pt-8">
          <CardTitle className="text-2xl font-bold">Cycle Club Sticker Verification</CardTitle>
          <CardDescription>
            Enter the unique code from your sticker to access rider information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-red-100">
                  <SafetyOutlined className="text-cycling-red text-3xl" />
                </div>
              </div>
              <Input
                type="text"
                placeholder="Enter 6-digit sticker code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center text-xl tracking-widest py-6 border-2 rounded-xl"
                maxLength={6}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cycling-red hover:bg-red-700 text-white py-6 rounded-xl"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Sticker"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>
            This verification system is for emergency purposes only.
          </p>
          <p>
            For club members, please use the <a href="/login" className="text-cycling-red hover:underline">admin login</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StickerVerification;
