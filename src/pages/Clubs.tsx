
import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchClubs, setSelectedClub } from '../redux/slices/clubSlice';
import { Users, MapPin, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Clubs = () => {
  const dispatch = useAppDispatch();
  const { clubs, selectedClub, isLoading, error } = useAppSelector((state) => state.clubs);

  useEffect(() => {
    dispatch(fetchClubs())
      .unwrap()
      .catch(err => {
        toast({
          title: "Error",
          description: err || "Failed to load clubs",
          variant: "destructive",
        });
      });
  }, [dispatch]);

  const handleClubChange = (clubId: string) => {
    dispatch(setSelectedClub(clubId));
  };

  const currentClubData = selectedClub || (clubs.length > 0 ? clubs[0] : null);
  const inactiveRiders = currentClubData 
    ? currentClubData.members.length - currentClubData.activeRiders 
    : 0;

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-600">{error}</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Clubs</h1>
        </div>
        
        <div className="grid gap-6">
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-2xl">Club Details</CardTitle>
                <p className="text-sm text-muted-foreground">View and manage club statistics</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cycling-blue"></div>
                </div>
              ) : (
                <>
                  <Select 
                    defaultValue={clubs.length > 0 ? clubs[0].id : undefined} 
                    onValueChange={handleClubChange}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Select a club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.id}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {currentClubData && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">Club Location</CardTitle>
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{currentClubData.location}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{currentClubData.members.length}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">Total Rides/Events</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{currentClubData.rides}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{currentClubData.activeRiders}</p>
                          <p className="text-xs text-muted-foreground">Last 12 months</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">Inactive Riders</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{inactiveRiders}</p>
                          <p className="text-xs text-muted-foreground">No activity in 12 months</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clubs;
