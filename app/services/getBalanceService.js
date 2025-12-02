import api from './api';

export const getBalance = async () => {
    try {
        const response = await api.get('/balance');
        return response.data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }                                           
};