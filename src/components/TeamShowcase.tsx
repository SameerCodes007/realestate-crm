import { Phone, Mail, Linkedin } from './icons';

const team = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Sales Director',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Property Consultant',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

const TeamShowcase = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">Expert professionals at your service</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-red-600">
                    <Phone className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-600">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-600">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamShowcase;