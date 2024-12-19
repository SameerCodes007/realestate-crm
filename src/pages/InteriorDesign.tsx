import React from 'react';
import LeadForm from '../components/LeadForm';
import { Paintbrush2, CheckCircle } from '../components/icons';

const services = [
  {
    title: 'Residential Interiors',
    description: 'Transform your home with our custom interior design solutions',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Commercial Interiors',
    description: 'Create inspiring workspaces that reflect your brand',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Modular Solutions',
    description: 'Space-saving modular furniture and storage solutions',
    image: 'https://images.unsplash.com/photo-1609347744403-2306e8a9ae27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

const features = [
  'Customized Design Solutions',
  'Premium Materials',
  'Expert Craftsmanship',
  'Timely Completion',
  'Cost-Effective Solutions',
  'After-Service Support'
];

const InteriorDesign = () => {
  return (
    <div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Interior Design Services</h1>
          <p className="text-xl text-gray-300">Transform your space with our expert designers</p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600">Creating beautiful spaces with attention to detail</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature} className="flex items-center">
                <CheckCircle className="h-6 w-6 text-red-600 mr-2" />
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadForm />
    </div>
  );
};

export default InteriorDesign;