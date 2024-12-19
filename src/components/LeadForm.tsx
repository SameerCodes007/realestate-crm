import React, { useState } from 'react';
import { Send } from './icons';

const LeadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-300">
            Let us help you find your dream property
          </p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="interest"
                className="block text-sm font-medium mb-2"
              >
                Requirement
              </label>
              <textarea id="requirement"
                value={formData.requirement}
                onChange={(e) =>
                  setFormData({ ...formData, requirement: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center text-lg font-semibold transition duration-300"
            >
              Submit Enquiry
              <Send className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;
