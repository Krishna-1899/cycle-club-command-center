import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRiders, mockRides, getUpcomingEvents } from '../data/mockData';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TeamOutlined, TrophyOutlined, ClockCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { Cake, Calendar } from 'lucide-react';

// Mock data for the participation chart
const participationData = [
  { month: 'Jan', participation: 35 },
  { month: 'Feb', participation: 38 },
  { month: 'Mar', participation: 42 },
  { month: 'Apr', participation: 45 },
  { month: 'May', participation: 48 },
  { month: 'Jun', participation: 52 },
  { month: 'Jul', participation: 58 },
  { month: 'Aug', participation: 65 },
  { month: 'Sep', participation: 62 },
  { month: 'Oct', participation: 58 },
  { month: 'Nov', participation: 55 },
  { month: 'Dec', participation: 52 },
];

// Mock data for top riders
const topRiders = [
  { name: 'John Smith', rides: 42, distance: '1,254 km', rank: 1 },
  { name: 'Sarah Johnson', rides: 38, distance: '1,120 km', rank: 2 },
  { name: 'Michael Brown', rides: 35, distance: '987 km', rank: 3 },
  { name: 'Emily Davis', rides: 33, distance: '945 km', rank: 4 },
  { name: 'David Wilson', rides: 30, distance: '876 km', rank: 5 },
];

// Mock data for recent activities
const recentActivities = [
  { user: 'John Smith', action: 'completed a ride', details: 'Mountain Trail Challenge', time: '2 hours ago' },
  { user: 'Admin', action: 'added a new event', details: 'Weekend City Tour', time: '5 hours ago' },
  { user: 'Sarah Johnson', action: 'updated profile', details: 'Changed emergency contact', time: '8 hours ago' },
  { user: 'Michael Brown', action: 'joined a ride', details: 'Coastal Scenic Route', time: '1 day ago' },
  { user: 'Emily Davis', action: 'earned a badge', details: 'Century Rider', time: '1 day ago' },
];

import { 
  TeamOutlined, 
  CalendarOutlined, 
  CheckOutlined, 
  WarningOutlined 
} from '@ant-design/icons';

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-md rounded-xl border-none hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <TeamOutlined className="text-xl" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Participation Chart */}
          <Card className="lg:col-span-2 bg-white shadow-md rounded-xl border-none">
            <CardHeader>
              <CardTitle>Ride Participation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={participationData}>
                    <defs>
                      <linearGradient id="participation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="participation" 
                      stroke="#000000" 
                      fillOpacity={1} 
                      fill="url(#participation)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-white shadow-md rounded-xl border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Link to="/events" className="text-sm hover:underline">View all</Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={`${event.riderId}-${event.type}`} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${event.type === 'birthday' ? 'bg-black' : 'bg-gray-600'}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{event.riderName}</p>
                    <p className="text-xs text-muted-foreground">{event.type} - {event.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Riders */}
          <Card className="bg-white shadow-md rounded-xl border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Riders</CardTitle>
              <TrophyOutlined className="text-xl" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRiders.map((rider) => (
                  <div key={rider.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                        {rider.rank}
                      </div>
                      <div>
                        <p className="font-medium">{rider.name}</p>
                        <p className="text-sm text-muted-foreground">{rider.rides} rides · {rider.distance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-white shadow-md rounded-xl border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activities</CardTitle>
              <HistoryOutlined className="text-xl" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-black" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                        {activity.details && <span className="text-muted-foreground"> - {activity.details}</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
