import { supabase } from '../lib/supabase';

export async function uploadImage(file: File, bucket: string, path: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteImage(bucket: string, url: string): Promise<void> {
  const path = url.split(bucket + '/').pop();
  
  try{
    await supabase.storage
    .from(bucket)
    .remove([path]);
    console.log('done');
    
  }
  catch (error) {
    throw error;
  }
}