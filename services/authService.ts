import axios from 'axios';

// const API_URL = 'http://localhost:8081/api/auth';
// NEXT_PUBLIC_DOCKER_TASK_MANAGER_API_URL = https://todo-app-backend-31e9.onrender.com/api
const API_URL = `${process.env.NEXT_PUBLIC_DOCKER_TASK_MANAGER_API_URL}/api/auth`;

export const register = async (user: { username: string; password: string; email: string }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const login = async (loginRequest:{ username: string; password: string }) => {
    try{
        const response = await axios.post(`${API_URL}/login`, loginRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Backend Response:', response);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data.token;
    } catch (error) {
        console.error('Error in login service:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
}

