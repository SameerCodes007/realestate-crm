import React from 'react';
import { X } from '../myIcons';
import Image from '../Image';
import { deleteImage } from '../../utils/imageUpload';
import { supabase } from '../../lib/supabase';

interface ImageViewerProps {
  images: string[];
  type: 'resale' | 'primary_sale' | 'rental';
  propertyId: string;
  onImagesUpdate: (updatedImages: string[]) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ 
  images, 
  type,
  propertyId,
  onImagesUpdate,
}) => {
  const handleDelete = async (imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      // Delete from storage
      await deleteImage(type, imageUrl);

      // Update the database
      const updatedImages = images.filter(url => url !== imageUrl);
      const { error } = await supabase
        .from(type === 'plots' ? 'plots' : type === 'team' ? 'team' : `${type}_properties`)
        .update({ images: updatedImages })
        .eq('id', propertyId);

      if (error) throw error;

      // Update the UI
      onImagesUpdate(updatedImages);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  return (
    <>
        <h3 className="text-lg font-medium">Current Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group">
            <Image
                src={url}
                alt={`Property image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
            />
            <button
                onClick={() => handleDelete(url)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X className="h-4 w-4" />
            </button>
            </div>
        ))}
        </div>
    </>
  );
};

export default ImageViewer;