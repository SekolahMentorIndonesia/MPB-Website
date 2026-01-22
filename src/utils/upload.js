import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return { Authorization: `Bearer ${token}` };
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);

    console.log('📤 Sending request to:', `${API_URL}/api/user/upload-photo`);
    console.log('📤 FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
    }

    const response = await axios.post(`${API_URL}/api/user/upload-photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeader()
      },
    });

    console.log('📤 Response status:', response.status);
    console.log('📤 Response data:', response.data);
    console.log('📤 Response headers:', response.headers);

    if (response.data.photoUrl) {
      console.log('✅ Extracted photoUrl:', response.data.photoUrl);
      return response.data.photoUrl;
    }

    console.error('❌ No photoUrl in response:', response.data);
    throw new Error('Upload failed - no photoUrl returned');
  } catch (error) {
    console.error('❌ Upload error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};
