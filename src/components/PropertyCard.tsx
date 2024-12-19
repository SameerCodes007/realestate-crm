import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from './icons';
import Modal from './Modal';
import LeadForm from './LeadForm';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    image: string;
    beds: number;
    baths: number;
    area: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const navigate = useNavigate();

  const handleLeadSubmit = () => {
    setShowLeadForm(false);
    navigate(`/property/${property.id}`);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
        onClick={() => setShowLeadForm(true)}
      >
        <div className="relative h-48">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          {/* <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
            {property.price}
          </div> */}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            {/* <div className="flex items-center">
              <Bed className="h-5 w-5 mr-1" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-1" />
              <span>{property.baths} Baths</span>
            </div> */}
            {/* <div className="flex items-center">
              <Square className="h-5 w-5 mr-1" />
              <span>{property.area}</span>
            </div> */}
          </div>
        </div>
      </div>

      <Modal isOpen={showLeadForm} onClose={() => setShowLeadForm(false)}>
        <LeadForm onSubmit={handleLeadSubmit} propertyTitle={property.title} />
      </Modal>
    </>
  );
};

export default PropertyCard;