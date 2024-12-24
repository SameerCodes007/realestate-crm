import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../utils/formatters';
import { uploadImage } from '../../utils/imageUpload';
import ImageUploader from './ImageUploader';
import ImageViewer from './ImageViewer';
import { deleteImage } from '../../utils/imageUpload';
import { Plus, Pencil, Trash } from '../myIcons';

interface Plot {
  id: string;
  builder_name: string;
  project: string;
  location: string;
  price_per_sqft: number;
  total_price: string;
  images: string[];
}

const PlotsManager = () => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    builder_name: '',
    project: '',
    location: '',
    price_per_sqft: '',
    total_price: '',
    tempImages: [] as File[]
  });

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('plots')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
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
    setLoading(true);

    try {
      // Upload new images first
      const uploadedImageUrls = await Promise.all(
        formData.tempImages.map(file => 
          uploadImage(file, 'plots', `${editingPlot?.id || 'new'}`)
        )
      );

      // Combine existing and new images
      const allImages = editingPlot 
        ? [...editingPlot.images, ...uploadedImageUrls]
        : uploadedImageUrls;

      const plotData = {
        builder_name: formData.builder_name,
        project: formData.project,
        location: formData.location,
        price_per_sqft: parseFloat(formData.price_per_sqft),
        total_price: formData.total_price,
        images: allImages
      };

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
      handleCancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plot?')) return;

    try {
      const plot = plots.find(p => p.id === id);
      
      // Delete images from storage
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

  const handleEdit = (plot: Plot) => {
    setEditingPlot(plot);
    setFormData({
      builder_name: plot.builder_name,
      project: plot.project,
      location: plot.location,
      price_per_sqft: plot.price_per_sqft.toString(),
      total_price: plot.total_price,
      tempImages: []
    });
    setShowForm(true);
  };

  const handleImagesUpdate = (updatedImages: string[]) => {
    if (editingPlot) {
      setEditingPlot({
        ...editingPlot,
        images: updatedImages
      });
    }
    fetchPlots();
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

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlot(null);
    setFormData({
      builder_name: '',
      project: '',
      location: '',
      price_per_sqft: '',
      total_price: '',
      tempImages: []
    });
    setError(null);
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
        <h2 className="text-2xl font-bold">Gated Community Plots</h2>
        <button
          onClick={() => setShowForm(true)}
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
                Price per Sq.ft
              </label>
              <input
                type="number"
                value={formData.price_per_sqft}
                onChange={(e) => setFormData({ ...formData, price_per_sqft: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Price
              </label>
              <input
                type="text"
                value={formData.total_price}
                onChange={(e) => setFormData({ ...formData, total_price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          {editingPlot && editingPlot.images && editingPlot.images.length > 0 && (
            <div className="space-y-4">
              <ImageViewer
                images={editingPlot.images}
                type="plots"
                propertyId={editingPlot.id}
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
              {loading ? 'Saving...' : (editingPlot ? 'Update' : 'Create')}
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
                    <div className="text-xs">Total: {plot.total_price}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(plot)}
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