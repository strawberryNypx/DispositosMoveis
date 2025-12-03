import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteReceive = async (item_id) => {
  try {
    const token = await AsyncStorage.getItem('@finToken');

    const response = await api.delete(`/receives/delete`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { item_id }
    });

    console.log("Item deletado:", response.data);
    return response.data;

  } catch (error) {
    console.error("Erro ao deletar item:", error);
    throw error;
  }
};
