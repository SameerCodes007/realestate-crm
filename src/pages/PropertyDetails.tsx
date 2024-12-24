import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { MapPin, Download } from '../components/icons';
import LeadForm from '../components/LeadForm';

const PropertyDetails = () => {
  const { id, type = 'resale' } = useParams();
  const { property, loading, error } = useProperty(type as any, id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-red-600 p-4">
        Error loading property details: {error || 'Property not found'}
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img 
          src={property.images?.[0] || '/placeholder.jpg'} 
          alt={property.project}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">{property.project}</h1>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Builder</p>
                  <p className="font-semibold">{property.builder_name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-semibold">{property.size}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <p className="text-grey-800">{property.location}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  {property.price}
                </h3>
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