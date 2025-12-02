import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function postRecive(data) {
  const token = await AsyncStorage.getItem('@finToken');

  return api.post('/receive', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}