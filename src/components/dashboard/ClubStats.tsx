
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClubs } from '@/data/clubData';
import { Users } from 'lucide-react';

const ClubStats = () => {
  const [selectedClub, setSelectedClub] = React.useState(mockClubs[0].id);

  const currentClub = mockClubs.find(club => club.id === selectedClub);
  const inactiveRiders = currentClub ? currentClub.members.length - currentClub.activeRiders : 0;

  return (
    <Card className="bg-white shadow-md rounded-xl border-none hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Club Statistics</CardTitle>
        <Users className="text-xl" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Select defaultValue={selectedClub} onValueChange={setSelectedClub}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a club" />
          </SelectTrigger>
          <SelectContent>
            {mockClubs.map((club) => (
              <SelectItem key={club.id} value={club.id}>
                {club.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {currentClub && (
          <div className="space-y-3 pt-2">
            <div>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <p className="text-lg font-semibold">{currentClub.members.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Rides/Events</p>
              <p className="text-lg font-semibold">{currentClub.rides}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Riders</p>
              <p className="text-lg font-semibold">{currentClub.activeRiders}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inactive Riders</p>
              <p className="text-lg font-semibold">{inactiveRiders}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClubStats;
