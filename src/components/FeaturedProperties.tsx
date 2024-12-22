import PropertyCard from './PropertyCard';
import { useProperties } from '../hooks/useProperties';

const FeaturedProperties = () => {
  const { properties, loading, error } = useProperties('resale');  
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading properties: {error}
      </div>
    );
  }
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Propemrties
          </h2>
          <p className="text-lg text-gray-600">
            Discover our hand-picked premium properties
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={{
                  ...property,
                  image: property.images?.[0] || '/placeholder.jpg'
                }} 
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
