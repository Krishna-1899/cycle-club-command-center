
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '../data/mockData';
import { Search, Filter, Phone, Check, X, Cake, User, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchRiders, setPage, updateFilters } from '../redux/slices/riderSlice';
import PaginationControl from '../components/common/PaginationControl';
import { toast } from '@/components/ui/use-toast';

const RiderManagement = () => {
  const dispatch = useAppDispatch();
  const { 
    riders, 
    pagination, 
    filters,
    isLoading, 
    error 
  } = useAppSelector((state) => state.riders);

  useEffect(() => {
    loadRiders();
  }, [dispatch, pagination.page, filters]);

  const loadRiders = () => {
    dispatch(fetchRiders({
      page: pagination.page,
      limit: pagination.limit,
      searchQuery: filters.searchQuery,
      statusFilter: filters.statusFilter,
      birthdayMonthFilter: filters.birthdayMonthFilter
    }))
      .unwrap()
      .catch(err => {
        toast({
          title: "Error",
          description: err || "Failed to load riders",
          variant: "destructive",
        });
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    dispatch(updateFilters({ searchQuery }));
  };

  const handleStatusFilterChange = (value: string) => {
    dispatch(updateFilters({ statusFilter: value }));
  };

  const handleBirthdayMonthFilterChange = (value: string) => {
    dispatch(updateFilters({ birthdayMonthFilter: value }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const exportToCSV = () => {
    // This would typically call an API endpoint to get all riders for export
    // For now, we'll use the riders in the current state
    const headers = [
      'ID',
      'Full Name',
      'Phone Number',
      'Date of Birth',
      'Blood Group',
      'Emergency Contact',
      'Vehicle Registration',
      'Vehicle Brand',
      'Vehicle Model',
      'Join Date',
      'Total Rides',
      'Last Ride Date',
      'Status',
      'Notes'
    ];
    
    const csvData = riders.map(rider => [
      rider.id,
      rider.fullName,
      rider.phoneNumber,
      rider.dateOfBirth,
      rider.bloodGroup,
      rider.emergencyContact,
      rider.vehicle.registrationNumber,
      rider.vehicle.brand,
      rider.vehicle.model,
      rider.joinDate,
      rider.totalRides.toString(),
      rider.lastRideDate,
      rider.status,
      rider.notes || ''
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell || ''}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `riders-export-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasSpecialEvent = (rider: any): { type: string | null, day: number | null } => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const birthDate = new Date(rider.dateOfBirth);
    
    if (birthDate.getMonth() === currentMonth) {
      return { type: 'birthday', day: birthDate.getDate() };
    }
    
    if (rider.anniversary) {
      const annivDate = new Date(rider.anniversary);
      if (annivDate.getMonth() === currentMonth) {
        return { type: 'anniversary', day: annivDate.getDate() };
      }
    }
    
    return { type: null, day: null };
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-cycling-blue">Rider Management</h1>
          <Button onClick={exportToCSV} className="bg-cycling-blue hover:bg-cycling-lightBlue">
            Export to CSV
          </Button>
        </div>
        
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center text-red-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone"
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
              
              <Select
                value={filters.statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filters.birthdayMonthFilter}
                onValueChange={handleBirthdayMonthFilterChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by birthday month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cycling-blue"></div>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Rider Name</TableHead>
                      <TableHead className="hidden md:table-cell">Phone</TableHead>
                      <TableHead className="hidden lg:table-cell">Blood Group</TableHead>
                      <TableHead className="hidden lg:table-cell">Vehicle</TableHead>
                      <TableHead className="hidden md:table-cell">Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Total Rides</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riders.map((rider) => {
                      const specialEvent = hasSpecialEvent(rider);
                      return (
                        <TableRow key={rider.id}>
                          <TableCell className="font-medium">{rider.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{rider.fullName}</span>
                              {specialEvent.type && (
                                <div className="ml-2 text-cycling-red">
                                  {specialEvent.type === 'birthday' ? (
                                    <Cake className="h-4 w-4" />
                                  ) : (
                                    <User className="h-4 w-4" />
                                  )}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1 text-muted-foreground" /> 
                              {rider.phoneNumber}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="font-medium">{rider.bloodGroup}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {rider.vehicle.brand} {rider.vehicle.model}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(rider.joinDate)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {rider.status === 'active' ? (
                                <span className="flex items-center text-green-600">
                                  <Check className="h-4 w-4 mr-1" /> Active
                                </span>
                              ) : (
                                <span className="flex items-center text-amber-600">
                                  <X className="h-4 w-4 mr-1" /> Inactive
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{rider.totalRides}</TableCell>
                          <TableCell className="text-right">
                            <Link to={`/riders/${rider.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-4 pb-4">
              <PaginationControl 
                currentPage={pagination.page} 
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RiderManagement;
