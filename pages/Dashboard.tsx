import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import EnquiriesTable from '../components/dashboard/EnquiriesTable';
import PropertiesManager from '../components/dashboard/PropertiesManager';
import PlotsManager from '../components/dashboard/PlotsManager';
import ServicesManager from '../components/dashboard/ServicesManager';
import TeamManager from '../components/dashboard/TeamManager';
import AuthGuard from '../components/AuthGuard';

const Dashboard = () => {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-100">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route index element={<Navigate to="enquiries" replace />} />
            <Route path="enquiries" element={<EnquiriesTable />} />
            <Route path="resale-properties" element={<PropertiesManager type="resale" />} />
            <Route path="primary-sale-properties" element={<PropertiesManager type="primary_sale" />} />
            <Route path="rental-properties" element={<PropertiesManager type="rental" />} />
            <Route path="plots" element={<PlotsManager />} />
            <Route path="construction" element={<ServicesManager type="construction" />} />
            <Route path="interior-design" element={<ServicesManager type="interior" />} />
            <Route path="developers" element={<ServicesManager type="developers" />} />
            <Route path="awards" element={<ServicesManager type="awards" />} />
            <Route path="team" element={<TeamManager />} />
          </Routes>
        </main>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;