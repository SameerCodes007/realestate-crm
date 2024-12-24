import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUploader from './ImageUploader';
import { uploadImage, deleteImage } from '../../utils/imageUpload';
import { Plus, Trash } from '../myIcons';
import Image from '../Image';

interface ServicesManagerProps {
  type: 'construction' | 'interior' | 'developers' | 'awards';
}

interface Service {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  images?: string;
  name?: string;
  logo?: string;
}

interface FormData {
  title?: string;
  description?: string;
  name?: string;
  tempImages: File[];
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ type }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    name: '',
    tempImages: []
  });

  const tableName = `${type}${type === 'developers' ? '' : '_services'}`;

  useEffect(() => {
    fetchServices();
    return () => {
      // Cleanup on unmount
      setError(null);
      setFormData({
        title: '',
        description: '',
        name: '',
        tempImages: []
      });
    };
  }, [type]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (files: FileList) => {
    setFormData(prev => ({
      ...prev,
      tempImages: [...prev.tempImages, ...Array.from(files)]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Upload images first
      const uploadedUrls = await Promise.all(
        formData.tempImages.map(file => 
          uploadImage(file, type, `${Date.now()}`)
        )
      );

      // Prepare data based on service type
      const serviceData = type === 'developers' 
        ? { 
            name: formData.name,
            logo: uploadedUrls[0]
          }
        : type === 'awards' ? {
          title: formData.title,
          images: uploadedUrls[0]
        } : {
            title: formData.title,
            description: formData.description,
            images: uploadedUrls[0]
          };

      const { error } = await supabase
        .from(tableName)
        .insert([serviceData]);

      if (error) throw error;

      // Reset form and fetch updated data
      setFormData({
        title: '',
        description: '',
        name: '',
        tempImages: []
      });
      setShowForm(false);
      await fetchServices();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = async (service: Service) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const imagesToDelete = type === 'developers' 
        ? service.logo
        : service.images;

      await Promise.all(
        [imagesToDelete].map(url => deleteImage(type, url))
      );

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', service.id);

      if (error) throw error;
      await fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
    setFormData({
      title: '',
      description: '',
      name: '',
      tempImages: []
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePreviewImageDelete = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tempImages: prev.tempImages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add {type === 'developers' ? 'Developer' : 'Service'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          {type === 'developers' ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Developer Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </>
          )}

          <ImageUploader
            images={formData.tempImages.map(file => URL.createObjectURL(file))}
            onUpload={handleImageSelect}
            onDelete={handlePreviewImageDelete}
            multiple={type !== 'developers'}
          />

          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div key={service.id} className="relative group">
            <Image
              src={type === 'developers' ? service.logo : service?.images ? service?.images : ""}
              alt={service.title || service.name || ''}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => handleImageDelete(service)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash className="h-4 w-4" />
            </button>
            {(service.title || service.name) && (
              <div className="mt-2 text-center">
                <h3 className="font-semibold">{service.title || service.name}</h3>
                {service.description && (
                  <p className="text-sm text-gray-600">{service.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;