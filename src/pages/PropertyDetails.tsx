import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Phone, Mail, Download } from '../components/icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LeadForm from '../components/LeadForm';

const PropertyDetails = () => {
  const { id } = useParams();

  // Mock property data - in real app, fetch based on id
  const property = {
    id: 1,
    title: 'Luxury Villa in Whitefield',
    location: 'Whitefield, Bangalore - 560066',
    price: '₹2.5 Cr',
    reraNo: 'PRM/KA/RERA/1251/446/PR/190924/007048',
    type: 'Villa',
    bedrooms: '4 BHK',
    totalUnits: '24 Units',
    area: '3500 sq ft',
    developmentSize: '5 Acres',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Swimming Pool',
      'Gym',
      'Club House',
      'Children\'s Play Area',
      'Security',
      'Power Backup'
    ],
    description: 'Experience luxury living at its finest in this premium villa located in the heart of Whitefield. This property offers spacious interiors, modern amenities, and a serene environment perfect for families.'
  };

  const mapStyles = {
    height: '400px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 12.9716,
    lng: 77.5946
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <div className="flex items-center text-xl">
                <MapPin className="h-6 w-6 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Bed className="h-6 w-6 text-red-600 mr-2" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-6 w-6 text-red-600 mr-2" />
                  <span>{property.area}</span>
                </div>
                <div>
                  <p className="text-gray-600">Development Size</p>
                  <p className="font-semibold">{property.developmentSize}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Units</p>
                  <p className="font-semibold">{property.totalUnits}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}
                >
                  <Marker position={defaultCenter} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">{property.price}</h3>
                <p className="text-gray-600">RERA No: {property.reraNo}</p>
              </div>
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                Download Brochure
              </button>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;