import React from 'react';
import LeadForm from '../components/LeadForm';
import { MapPin, Square } from '../components/icons';

const plots = [
  {
    id: 1,
    title: 'Premium Plot in Electronic City',
    location: 'Electronic City Phase 1',
    price: '₹80 Lakhs',
    area: '1200 sq ft',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Gated Community Plot in Devanahalli',
    location: 'Devanahalli',
    price: '₹1.2 Cr',
    area: '2400 sq ft',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'Premium Plot in Whitefield',
    location: 'Whitefield',
    price: '₹95 Lakhs',
    area: '1500 sq ft',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

const GatedPlots = () => {
  return (
    <div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Gated Community Plots</h1>
          <p className="text-xl text-gray-300">Premium plots in secure communities</p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plots.map((plot) => (
              <div key={plot.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img src={plot.image} alt={plot.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
                    {plot.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plot.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{plot.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{plot.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <LeadForm />
    </div>
  );
};

export default GatedPlots;