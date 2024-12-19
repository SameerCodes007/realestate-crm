import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from './icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Footer = () => {
  const mapStyles = {
    height: '200px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 12.886150,
    lng: 77.587372
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GLOBAL ENTERPRISES</h3>
            <p className="text-gray-400">Your trusted partner in real estate solutions across Bangalore.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/property-resale" className="text-gray-400 hover:text-white">Property Resale</Link></li>
              <li><Link to="/new-properties" className="text-gray-400 hover:text-white">New Properties</Link></li>
              <li><Link to="/rental-properties" className="text-gray-400 hover:text-white">Rental Properties</Link></li>
              <li><Link to="/gated-plots" className="text-gray-400 hover:text-white">Gated Plots</Link></li>
              <li><Link to="/construction" className="text-gray-400 hover:text-white">Construction</Link></li>
              <li><Link to="/interior-design" className="text-gray-400 hover:text-white">Interior Design</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-8 w-8 mr-2 text-red-600" />
                <a 
                  href="https://maps.app.goo.gl/MarKkvFjX26iZycj6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Aashiyana, No.16, Ground Floor, 5th Main, JP Nagar 7th Phase
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-600" />
                <a href="tel:08040998072" className="text-gray-400 hover:text-white">08040998072</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-red-600" />
                <a href="mailto:theglobalenterprises@gmail.com" className="text-gray-400 hover:text-white">
                  theglobalenterprises@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Location</h4>
            <LoadScript googleMapsApiKey="AIzaSyAR6oZ1l7uhxQp6cWmSa_kyRuGCmtujjiM">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={defaultCenter}
              >
                <Marker position={defaultCenter} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Global Enterprises. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;