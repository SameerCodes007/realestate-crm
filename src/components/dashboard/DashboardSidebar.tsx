import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Home,
  Key,
  MapPin,
  Construction,
  Paintbrush2,
  Users,
  Award,
  LogOut,
  MessageSquare
} from '../myIcons/index';

const menuItems = [
  { path: 'enquiries', label: 'Enquiries', icon: MessageSquare },
  { path: 'resale-properties', label: 'Resale Properties', icon: Building2 },
  { path: 'primary-sale-properties', label: 'Primary Sale', icon: Key },
  { path: 'rental-properties', label: 'Rental Properties', icon: Home },
  { path: 'plots', label: 'Plots', icon: MapPin },
  { path: 'construction', label: 'Construction', icon: Construction },
  { path: 'interior-design', label: 'Interior Design', icon: Paintbrush2 },
  { path: 'developers', label: 'Developers', icon: Building2 },
  { path: 'awards', label: 'Awards', icon: Award },
  { path: 'team', label: 'Team', icon: Users },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Global Enterprises</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-red-600' : 'hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;