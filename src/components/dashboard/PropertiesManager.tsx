import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadImage, deleteImage } from '../../utils/imageUpload';
import { formatPrice } from '../../utils/formatters';
import ImageUploader from './ImageUploader';
// import {  Trash } from '../icons';

interface Property {
  id: string;
  builder_name: string;
  project: string;
  location: string;
  size: string;
  price: number;
  images: string[];
}

interface PropertiesManagerProps {
  type: 'resale' | 'primary-sale' | 'rental';
}

const PropertiesManager: React.FC<PropertiesManagerProps> = ({ type }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);

  const tableName = `${type}_properties`;

  useEffect(() => {
    fetchProperties();
  }, [type]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const propertyData = {
      builder_name: formData.get('builder_name'),
      project: formData.get('project'),
      location: formData.get('location'),
      size: formData.get('size'),
      price: parseFloat(formData.get('price') as string),
      images: editingProperty?.images || []
    };

    try {
      if (editingProperty) {
        const { error } = await supabase
          .from(tableName)
          .update(propertyData)
          .eq('id', editingProperty.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([propertyData]);
        
        if (error) throw error;
      }

      await fetchProperties();
      setShowForm(false);
      setEditingProperty(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    try {
      const urls = await Promise.all(
        Array.from(files).map(file => 
          uploadImage(file, 'properties', `${type}/${editingProperty?.id || 'new'}`)
        )
      );

      if (editingProperty) {
        const updatedImages = [...editingProperty.images, ...urls];
        setEditingProperty({ ...editingProperty, images: updatedImages });
        
        await supabase
          .from(tableName)
          .update({ images: updatedImages })
          .eq('id', editingProperty.id);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageDelete = async (url: string) => {
    try {
      await deleteImage('properties', url);
      
      if (editingProperty) {
        const updatedImages = editingProperty.images.filter(img => img !== url);
        setEditingProperty({ ...editingProperty, images: updatedImages });
        
        await supabase
          .from(tableName)
          .update({ images: updatedImages })
          .eq('id', editingProperty.id);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const property = properties.find(p => p.id === id);
      
      // Delete images first
      await Promise.all(
        property.images.map(url => deleteImage('properties', url))
      );

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {type === 'resale' ? 'Resale Properties' :
           type === 'primary-sale' ? 'Primary Sale Properties' :
           'Rental Properties'}
        </h2>
        <button
          onClick={() => {
            setEditingProperty(null);
            setShowForm(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          {/* <Plus className="h-5 w-5 mr-2" /> */}
          Add Property
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Builder Name
              </label>
              <input
                type="text"
                name="builder_name"
                defaultValue={editingProperty?.builder_name}
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
                name="project"
                defaultValue={editingProperty?.project}
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
                name="location"
                defaultValue={editingProperty?.location}
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
                name="size"
                defaultValue={editingProperty?.size}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                defaultValue={editingProperty?.price}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          <ImageUploader
            images={editingProperty?.images || []}
            onUpload={handleImageUpload}
            onDelete={handleImageDelete}
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {editingProperty ? 'Update' : 'Create'} Property
            </button>
          </div>
        </form>
      )}

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
                  {formatPrice(property.price)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingProperty(property);
                      setShowForm(true);
                    }}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    {/* <Pencil className="h-5 w-5" /> */}
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {/* <Trash className="h-5 w-5" /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertiesManager;