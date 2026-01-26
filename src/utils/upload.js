import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    
    const uploadUrl = `${API_BASE_URL}${API_ENDPOINTS.USER.UPLOAD}`;

    console.log('📤 Sending request to:', uploadUrl);
    console.log('📤 FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value);
    }

    const response = await axios.post(uploadUrl, formData, {
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
