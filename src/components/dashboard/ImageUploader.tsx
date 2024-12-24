import React, { useCallback } from 'react';
import { X } from '../icons';

interface ImageUploaderProps {
  images: string[];
  onUpload: (files: FileList) => Promise<void>;
  onDelete: (url: string) => Promise<void>;
  multiple?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  images, 
  onUpload, 
  onDelete, 
  multiple = true 
}) => {
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        await onUpload(files);
      }
    },
    [onUpload]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.length) {
        await onUpload(files);
      }
    },
    [onUpload]
  );

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors"
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          {/* <Upload className="h-12 w-12 text-gray-400" /> */}
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop images here, or click to select
          </p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt="Uploaded"
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => onDelete(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;