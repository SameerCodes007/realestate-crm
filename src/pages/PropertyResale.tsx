import React from 'react';
import FeaturedProperties from '../components/FeaturedProperties';
import LeadForm from '../components/LeadForm';

const PropertyResale = () => {
  return (
    <div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Property Resale</h1>
          <p className="text-xl text-gray-300">Find your perfect resale property in Bangalore</p>
        </div>
      </div>
      <FeaturedProperties />
      <LeadForm />
    </div>
  );
};

export default PropertyResale;