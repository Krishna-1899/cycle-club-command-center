import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRiders, mockRides, getUpcomingEvents } from '../data/mockData';

import {
  Users, Calendar, Check, AlertTriangle, Cake
} from 'lucide-react';

const Dashboard = () => {
  // Calculate dashboard stats
  const totalMembers = mockRiders.length;
  const totalRides = mockRides.length;
  const activeRiders = mockRiders.filter(rider => rider.status === 'active').length;
  const inactiveRiders = totalMembers - activeRiders;
  const participationRate = ((activeRiders / totalMembers) * 100).toFixed(1);
  
  // Get upcoming events (birthdays & anniversaries)
  const upcomingEvents = getUpcomingEvents(mockRiders, 7);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-cycling-blue">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">Registered riders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides/Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRides}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeRiders}</div>
              <p className="text-xs text-muted-foreground">Participated within 60 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Riders</CardTitle>
              <AlertTriangle className="h-4 w-4 text-cycling-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inactiveRiders}</div>
              <p className="text-xs text-muted-foreground">Not participated in 60+ days</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Participation Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Participation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-cycling-blue h-2.5 rounded-full" 
                style={{ width: `${participationRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>0%</span>
              <span>{participationRate}% of riders are active</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Birthdays & Anniversaries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Events (Next 7 days)</CardTitle>
            <Cake className="h-5 w-5 text-cycling-red" />
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div 
                    key={`${event.riderId}-${event.type}`}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <Link 
                        to={`/riders/${event.riderId}`}
                        className="font-medium hover:underline"
                      >
                        {event.riderName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {event.type === 'birthday' ? 'Birthday' : 'Anniversary'}
                      </p>
                    </div>
                    <div className="text-sm font-semibold">
                      {event.date}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No upcoming events in the next 7 days</p>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Activity - can be expanded in future versions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Recent rider activities and admin actions will be shown here in future updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
