import React from 'react';
import DeveloperShowcase from '../components/DeveloperShowcase';
import FeaturedProperties from '../components/FeaturedProperties';
import LeadForm from '../components/LeadForm';

const NewProperties = () => {
  return (
    <div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">New Properties</h1>
          <p className="text-xl text-gray-300">Discover new residential projects in Bangalore</p>
        </div>
      </div>
      <DeveloperShowcase />
      <FeaturedProperties />
      <LeadForm />
    </div>
  );
};

export default NewProperties;