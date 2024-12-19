import axios from 'axios';
import { User } from '../types/users'
import { UserDTO } from '../types/users'


const API_URL = `${process.env.NEXT_PUBLIC_DOCKER_TASK_MANAGER_API_URL}/users`

const getToken = () => localStorage.getItem('token');


export const getCurrentUser = async (): Promise<User> => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(`${API_URL}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};


export const fetchUserById = async ( userId: number ): Promise<UserDTO> => {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error creating task:', error);
        throw error;
    }
}
