import { Link } from 'react-router-dom';
import * as Icons from './icons';
import servicesData from '../data/services.json';

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Comprehensive real estate solutions for all your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service) => {
            const Icon = Icons[service.icon as keyof typeof Icons];
            return (
              <Link
                key={service.title}
                to={service.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <Icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;