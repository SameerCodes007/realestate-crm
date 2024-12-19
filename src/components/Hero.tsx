import { ArrowRight } from './icons';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Dream Property Awaits
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Discover premium properties in Bangalore with GLOBAL ENTERPRISES - Your trusted partner in real estate since 1970
            </p>
            <Link
                key={"Resale"}
                to={"/property-resale"}
              >
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center text-lg font-semibold transition duration-300">
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;