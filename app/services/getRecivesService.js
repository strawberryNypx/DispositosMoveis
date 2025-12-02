import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRecives = async () => {
  try {
    const token = await AsyncStorage.getItem('@finToken');

    const response = await api.get('/receives', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching receives:', error);
    throw error;
  }
};
