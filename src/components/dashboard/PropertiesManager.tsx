import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../utils/imageUpload';
import ImageUploader from './ImageUploader';
import ImageViewer from './ImageViewer';
import { Plus, Pencil, Trash } from '../myIcons';

interface Property {
  id: string;
  builder_name: string;
  project: string;
  location: string;
  size: string;
  price: number;
  images: string[];
  created_at: string;
}

interface FormData {
  builder_name: string;
  project: string;
  location: string;
  size: string;
  price: string;
  tempImages: File[];
}

interface PropertiesManagerProps {
  type: 'resale' | 'primary_sale' | 'rental';
}

const PropertiesManager: React.FC<PropertiesManagerProps> = ({ type }) => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<FormData>({
    builder_name: '',
    project: '',
    location: '',
    size: '',
    price: 0,
    tempImages: []
  });

  const tableName = `${type}_properties`;

  // Reset form when location changes
  useEffect(() => {
    handleCancel();
  }, [location.pathname]);

  useEffect(() => {
    fetchProperties();
  }, [type]);

  const fetchProperties = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProperties(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Upload new images first
      const uploadedImageUrls = await Promise.all(
        formData.tempImages.map(file => 
          uploadImage(file, 'properties', `${type}/${editingProperty?.id || 'new'}`)
        )
      );

      // Combine existing and new images
      const allImages = editingProperty 
        ? [...editingProperty.images, ...uploadedImageUrls]
        : uploadedImageUrls;

      const propertyData = {
        builder_name: formData.builder_name,
        project: formData.project,
        location: formData.location,
        size: formData.size,
        price: formData.price,
        images: allImages
      };

      if (editingProperty) {
        const { error } = await supabase
          .from(`${type}_properties`)
          .update(propertyData)
          .eq('id', editingProperty.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(`${type}_properties`)
          .insert([propertyData]);

        if (error) throw error;
      }

      await fetchProperties();
      handleCancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProperties();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      builder_name: property.builder_name,
      project: property.project,
      location: property.location,
      size: property.size,
      price: property.price,
      tempImages: []
    });
    setShowForm(true);
  };

  const handleImagesUpdate = (updatedImages: string[]) => {
    if (editingProperty) {
      setEditingProperty({
        ...editingProperty,
        images: updatedImages
      });
    }
    fetchProperties();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
    setFormData({
      builder_name: '',
      project: '',
      location: '',
      size: '',
      price: 0,
      tempImages: []
    });
    setError(null);
  };

  const handleImageSelect = (files: FileList) => {
    setFormData(prev => ({
      ...prev,
      tempImages: [...prev.tempImages, ...Array.from(files)]
    }));
  };

  const handleImageDelete = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tempImages: prev.tempImages.filter((_, i) => i !== index)
    }));
  };

  if (loading && !showForm) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {type === 'resale' ? 'Resale Properties' :
           type === 'primary_sale' ? 'Primary Sale Properties' :
           'Rental Properties'}
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Property
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Builder Name
              </label>
              <input
                type="text"
                value={formData.builder_name}
                onChange={(e) => setFormData({ ...formData, builder_name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project
              </label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          {editingProperty && editingProperty.images && editingProperty.images.length > 0 && (
            <div className="space-y-4">
              <ImageViewer
                images={editingProperty.images}
                type={type}
                propertyId={editingProperty.id}
                onImagesUpdate={handleImagesUpdate}
              />
            </div>
          )}

          <ImageUploader
            images={formData.tempImages.map(file => URL.createObjectURL(file))}
            onUpload={handleImageSelect}
            onDelete={handleImageDelete}
          />

          <div className="flex justify-end space-x-4">
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
              {loading ? 'Saving...' : (editingProperty ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Property
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {property.project}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.builder_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {property.price}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(property)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PropertiesManager;