import React from 'react';
import LeadForm from '../components/LeadForm';
import { MapPin, Square } from '../components/icons';
import { usePlots } from '../hooks/usePlots';
import { formatPrice } from '../utils/formatters';

const GatedPlots = () => {
  const { plots, loading } = usePlots();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
                  {plot.images?.[0] && (
                    <img 
                      src={plot.images[0]} 
                      alt={plot.project} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
                    {plot.total_price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plot.project}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{plot.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{formatPrice(plot.price_per_sqft)}/sq.ft</span>
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