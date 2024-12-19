import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Building2, Key, MapPin, Construction, Paintbrush2, Phone } from './icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Property Resale', path: '/property-resale', icon: Building2 },
    { name: 'New Properties', path: '/new-properties', icon: Key },
    { name: 'Rental Properties', path: '/rental-properties', icon: Building2 },
    { name: 'Gated Plots', path: '/gated-plots', icon: MapPin },
    { name: 'Construction', path: '/construction', icon: Construction },
    { name: 'Interior Design', path: '/interior-design', icon: Paintbrush2 },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Building2 className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">GLOBAL ENTERPRISES</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;