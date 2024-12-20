import React, { useState } from 'react';
import { Send } from './icons';
import { supabase } from '../lib/supabase';

const LeadForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        requirement: '',
      });
      
      if (onSubmit) onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="max-w-xl mx-auto mb-6 bg-red-900 text-white p-4 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="max-w-xl mx-auto mb-6 bg-green-900 text-white p-4 rounded-lg">
            Thank you for your enquiry. We'll get back to you soon!
          </div>
        )}

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
                htmlFor="requirement"
                className="block text-sm font-medium mb-2"
              >
                Requirement
              </label>
              <textarea
                id="requirement"
                value={formData.requirement}
                onChange={(e) =>
                  setFormData({ ...formData, requirement: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center text-lg font-semibold transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : (
                <>
                  Submit Enquiry
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;