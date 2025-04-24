import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from '../components/ui/use-toast';
import { mockRiders, mockRides, formatDate, calculateAge } from '../data/mockData';
import { ArrowLeft, Phone, Calendar, User, Car, AlertTriangle, Cake } from 'lucide-react';

const RiderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const rider = mockRiders.find(r => r.id === id);
  
  const riderRides = mockRides.filter(ride => ride.participants.includes(id || ''));
  
  const [notes, setNotes] = useState(rider?.notes || '');
  const [gearVerified, setGearVerified] = useState(rider?.checklist?.gearVerified || false);
  const [docsSubmitted, setDocsSubmitted] = useState(rider?.checklist?.docsSubmitted || false);
  
  const handleSaveNotes = () => {
    toast({
      title: "Notes Updated",
      description: "Rider notes have been updated successfully.",
    });
  };
  
  const handleChecklistUpdate = () => {
    toast({
      title: "Checklist Updated",
      description: "Rider checklist has been updated successfully.",
    });
  };
  
  if (!rider) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold">Rider Not Found</h2>
          <p className="text-muted-foreground mb-4">The rider you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/riders')}>
            Back to Riders List
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/riders')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-cycling-blue">{rider.fullName}</h1>
          <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${rider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {rider.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                    {rider.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium">{rider.bloodGroup}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium flex items-center">
                    <Cake className="h-4 w-4 mr-1 text-muted-foreground" />
                    {formatDate(rider.dateOfBirth)} ({calculateAge(rider.dateOfBirth)} years)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    {formatDate(rider.joinDate)}
                  </p>
                </div>
              </div>
              
              {rider.anniversary && (
                <div>
                  <p className="text-sm text-muted-foreground">Anniversary</p>
                  <p className="font-medium">{formatDate(rider.anniversary)}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground">Emergency Contact</p>
                <a 
                  href={`tel:${rider.emergencyContact}`}
                  className="font-medium text-cycling-blue hover:underline flex items-center"
                >
                  <Phone className="h-4 w-4 mr-1 text-cycling-blue" />
                  {rider.emergencyContact}
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" /> Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Registration Number</p>
                <p className="font-medium">{rider.vehicle.registrationNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Brand & Model</p>
                <p className="font-medium">{rider.vehicle.brand} {rider.vehicle.model}</p>
              </div>
              
              {rider.vehicle.pucExpiry && (
                <div>
                  <p className="text-sm text-muted-foreground">PUC Expiry</p>
                  <p className="font-medium">{formatDate(rider.vehicle.pucExpiry)}</p>
                </div>
              )}
              
              {rider.vehicle.insuranceExpiry && (
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Expiry</p>
                  <p className="font-medium">{formatDate(rider.vehicle.insuranceExpiry)}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Ride Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{rider.totalRides}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last Ride Date</p>
                <p className="font-medium">{formatDate(rider.lastRideDate)}</p>
              </div>
              
              {rider.stickerCode && (
                <div>
                  <p className="text-sm text-muted-foreground">Sticker Code</p>
                  <p className="font-medium bg-gray-100 p-2 rounded text-center">{rider.stickerCode}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="rides">
          <TabsList>
            <TabsTrigger value="rides">Ride History</TabsTrigger>
            <TabsTrigger value="notes">Admin Notes</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rides" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>All rides and events attended by {rider.fullName}</CardDescription>
              </CardHeader>
              <CardContent>
                {riderRides.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Ride/Event Title</TableHead>
                          <TableHead className="hidden md:table-cell">Distance</TableHead>
                          <TableHead className="hidden md:table-cell">Participants</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {riderRides.map((ride) => (
                          <TableRow key={ride.id}>
                            <TableCell>{formatDate(ride.date)}</TableCell>
                            <TableCell>{ride.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{ride.distance} km</TableCell>
                            <TableCell className="hidden md:table-cell">{ride.participants.length}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No ride history available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
                <CardDescription>Private notes for {rider.fullName}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this rider here..."
                  rows={5}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="checklist" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rider Verification Checklist</CardTitle>
                <CardDescription>Keep track of rider verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gear-verified">Gear Verified</Label>
                    <p className="text-sm text-muted-foreground">Helmet, riding gear, etc.</p>
                  </div>
                  <Switch
                    id="gear-verified"
                    checked={gearVerified}
                    onCheckedChange={setGearVerified}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="docs-submitted">Documents Submitted</Label>
                    <p className="text-sm text-muted-foreground">License, registration, etc.</p>
                  </div>
                  <Switch
                    id="docs-submitted"
                    checked={docsSubmitted}
                    onCheckedChange={setDocsSubmitted}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleChecklistUpdate}>Update Checklist</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RiderProfile;
