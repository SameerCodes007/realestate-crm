import React from 'react';
import { MapPin, Phone, Mail, Clock } from '../components/icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Contact = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 12.9716,
    lng: 77.5946,
  };

  return (
    <div>
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">Get in touch with our team</p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Office</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-600 mr-3 mt-1" />
                  <p className="text-gray-600">
                    Aashiyana, No.16, Ground Floor<br />
                    5th Main, Near Gowri Shankar Temple<br />
                    Suncity Layout, J P Nagar 7th Phase<br />
                    Off Kothanur Main Road, Bangalore - 560076
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-red-600 mr-3" />
                  <p className="text-gray-600">08040998072</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-red-600 mr-3" />
                  <p className="text-gray-600">theglobalenterprises@gmail.com</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-red-600 mr-3" />
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            
            <div>
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
        </div>
      </section>
    </div>
  );
};

export default Contact;