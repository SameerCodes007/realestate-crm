import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../utils/formatters';
import { uploadImage, deleteImage } from '../../utils/imageUpload';
import ImageUploader from './ImageUploader';
import { Plus, Pencil, Trash } from '../myIcons';

interface Plot {
  id: string;
  builder_name: string;
  project: string;
  location: string;
  price_per_sqft: number;
  total_price: number;
  images: string[];
}

const PlotsManager = () => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const { data, error } = await supabase
        .from('plots')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlots(data || []);
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
    
    const plotData = {
      builder_name: formData.get('builder_name'),
      project: formData.get('project'),
      location: formData.get('location'),
      price_per_sqft: parseFloat(formData.get('price_per_sqft') as string),
      total_price: parseFloat(formData.get('total_price') as string),
      images: editingPlot?.images || []
    };

    try {
      if (editingPlot) {
        const { error } = await supabase
          .from('plots')
          .update(plotData)
          .eq('id', editingPlot.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('plots')
          .insert([plotData]);
        
        if (error) throw error;
      }

      await fetchPlots();
      setShowForm(false);
      setEditingPlot(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    try {
      const urls = await Promise.all(
        Array.from(files).map(file => 
          uploadImage(file, 'plots', `${editingPlot?.id || 'new'}`)
        )
      );

      if (editingPlot) {
        const updatedImages = [...editingPlot.images, ...urls];
        setEditingPlot({ ...editingPlot, images: updatedImages });
        
        await supabase
          .from('plots')
          .update({ images: updatedImages })
          .eq('id', editingPlot.id);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageDelete = async (url: string) => {
    try {
      await deleteImage('plots', url);
      
      if (editingPlot) {
        const updatedImages = editingPlot.images.filter(img => img !== url);
        setEditingPlot({ ...editingPlot, images: updatedImages });
        
        await supabase
          .from('plots')
          .update({ images: updatedImages })
          .eq('id', editingPlot.id);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plot?')) return;

    try {
      const plot = plots.find(p => p.id === id);
      
      // Delete images first
      await Promise.all(
        plot.images.map(url => deleteImage('plots', url))
      );

      const { error } = await supabase
        .from('plots')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPlots();
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
        <h2 className="text-2xl font-bold">Gated Community Plots</h2>
        <button
          onClick={() => {
            setEditingPlot(null);
            setShowForm(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Plot
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
                defaultValue={editingPlot?.builder_name}
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
                defaultValue={editingPlot?.project}
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
                defaultValue={editingPlot?.location}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price per Sq.ft
              </label>
              <input
                type="number"
                name="price_per_sqft"
                defaultValue={editingPlot?.price_per_sqft}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Price
              </label>
              <input
                type="number"
                name="total_price"
                defaultValue={editingPlot?.total_price}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          <ImageUploader
            images={editingPlot?.images || []}
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
              {editingPlot ? 'Update' : 'Create'} Plot
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                Plot Details
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
            {plots.map((plot) => (
              <tr key={plot.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {plot.project}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plot.builder_name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {plot.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>
                    <div>{formatPrice(plot.price_per_sqft)}/sq.ft</div>
                    <div className="text-xs">Total: {formatPrice(plot.total_price)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingPlot(plot);
                      setShowForm(true);
                    }}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plot.id)}
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
    </div>
  );
};

export default PlotsManager;