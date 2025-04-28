
import React, { useEffect } from 'react';
import { Card, Select, Row, Col, Statistic, Spin, Alert } from 'antd';
import { TeamOutlined, EnvironmentOutlined, RightCircleOutlined } from '@ant-design/icons';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchClubs, setSelectedClub } from '../redux/slices/clubSlice';
import { message } from 'antd';

const Clubs = () => {
  const dispatch = useAppDispatch();
  const { clubs, selectedClub, isLoading, error } = useAppSelector((state) => state.clubs);

  useEffect(() => {
    dispatch(fetchClubs())
      .unwrap()
      .catch(err => {
        message.error(err || "Failed to load clubs");
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
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Clubs</h1>
        </div>
        
        <Card>
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Club Details</h3>
            <p className="text-gray-500">View and manage club statistics</p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <Select 
                defaultValue={clubs.length > 0 ? clubs[0].id : undefined} 
                onChange={handleClubChange}
                className="w-full max-w-xs mb-6"
                placeholder="Select a club"
              >
                {clubs.map((club) => (
                  <Select.Option key={club.id} value={club.id}>
                    {club.name}
                  </Select.Option>
                ))}
              </Select>

              {currentClubData && (
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} lg={8}>
                    <Card>
                      <Statistic 
                        title="Club Location"
                        value={currentClubData.location}
                        prefix={<EnvironmentOutlined />}
                      />
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} lg={8}>
                    <Card>
                      <Statistic 
                        title="Total Members"
                        value={currentClubData.members.length}
                        prefix={<TeamOutlined />}
                      />
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} lg={8}>
                    <Card>
                      <Statistic 
                        title="Total Rides/Events"
                        value={currentClubData.rides}
                        prefix={<RightCircleOutlined />}
                      />
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} lg={8}>
                    <Card>
                      <Statistic 
                        title="Active Riders"
                        value={currentClubData.activeRiders}
                        prefix={<TeamOutlined />}
                        suffix={<small className="text-xs text-gray-500">Last 12 months</small>}
                      />
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} lg={8}>
                    <Card>
                      <Statistic 
                        title="Inactive Riders"
                        value={inactiveRiders}
                        prefix={<TeamOutlined />}
                        suffix={<small className="text-xs text-gray-500">No activity in 12 months</small>}
                      />
                    </Card>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Clubs;
