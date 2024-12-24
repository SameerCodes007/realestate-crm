import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ImageUploader from './ImageUploader';
import { uploadImage } from '../../utils/imageUpload';
import { Plus, Pencil, Trash } from '../myIcons';
import Image from '../Image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  created_at: string;
}

interface FormData {
  name: string;
  role: string;
  tempImage: File | null;
}

const TeamManager = () => {
  const location = useLocation();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    tempImage: null
  });

  // Reset form when location changes
  useEffect(() => {
    handleCancel();
  }, [location.pathname]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setTeam(data || []);
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
      let imageUrl = editingMember?.image;

      // Upload new image if selected
      if (formData.tempImage) {
        imageUrl = await uploadImage(formData.tempImage, 'team', editingMember?.id || 'new');
      }

      const memberData = {
        name: formData.name,
        role: formData.role,
        image: imageUrl
      };

      if (editingMember) {
        const { error } = await supabase
          .from('team')
          .update(memberData)
          .eq('id', editingMember.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team')
          .insert([memberData]);

        if (error) throw error;
      }

      await fetchTeam();
      handleCancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTeam();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      tempImage: null
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      tempImage: null
    });
    setError(null);
  };

  const handleImageSelect = (files: FileList) => {
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        tempImage: files[0]
      }));
    }
  };

  const handleImageDelete = () => {
    setFormData(prev => ({
      ...prev,
      tempImage: null
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
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <ImageUploader
              images={formData.tempImage ? [URL.createObjectURL(formData.tempImage)] : []}
              onUpload={handleImageSelect}
              onDelete={handleImageDelete}
              multiple={false}
            />
          </div>

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
              {loading ? 'Saving...' : (editingMember ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <Image
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManager;