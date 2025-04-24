
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRiders, mockRides, getUpcomingEvents } from '../data/mockData';

import { 
  TeamOutlined, 
  CalendarOutlined, 
  CheckOutlined, 
  WarningOutlined 
} from '@ant-design/icons';
import { Cake } from 'lucide-react';

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
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        
        {/* Upcoming Birthdays & Anniversaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <Card key={`${event.riderId}-${event.type}`} className="bg-white shadow-md rounded-xl overflow-hidden border-none hover:shadow-lg transition-all">
                <div className={`h-2 w-full ${event.type === 'birthday' ? 'bg-cycling-red' : 'bg-black'}`}></div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg">
                        <Link to={`/riders/${event.riderId}`} className="hover:text-cycling-red">
                          {event.riderName}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        {event.type === 'birthday' ? (
                          <>
                            <Cake className="h-4 w-4 mr-1 text-cycling-red" /> Birthday
                          </>
                        ) : (
                          <>
                            <CalendarOutlined className="h-4 w-4 mr-1" /> Anniversary
                          </>
                        )}
                      </p>
                    </div>
                    <div className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                      {event.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full bg-white shadow-md rounded-xl overflow-hidden border-none">
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">No upcoming events in the next 7 days</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <TeamOutlined className="text-muted-foreground text-lg" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">Registered riders</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides/Events</CardTitle>
              <CalendarOutlined className="text-muted-foreground text-lg" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRides}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
              <CheckOutlined className="text-green-500 text-lg" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeRiders}</div>
              <p className="text-xs text-muted-foreground">Participated within 60 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Riders</CardTitle>
              <WarningOutlined className="text-cycling-red text-lg" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inactiveRiders}</div>
              <p className="text-xs text-muted-foreground">Not participated in 60+ days</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Participation Rate */}
        <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
          <CardHeader>
            <CardTitle>Participation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-black h-2.5 rounded-full" 
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
        
        {/* Recent Activity - can be expanded in future versions */}
        <Card className="bg-white shadow-md rounded-xl overflow-hidden border-none">
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
