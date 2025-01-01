import axios from 'axios'
import { Priority, Task } from "../types/tasks";
import { TaskDTO } from "../types/tasks";

// const API_URL = 'http://localhost:8081/api/tasks';
const API_URL = `${process.env.NEXT_PUBLIC_DOCKER_TASK_MANAGER_API_URL}/api/tasks`

const getToken = () => localStorage.getItem('token');

export const getTasks = async (): Promise<Task[]> => {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`getTasks: ${response.data}`);
        return response.data;
    } catch (error) {
        console.log('Error creating task:', error);
        return [];
    }
    // console.log(response.data);
    // return response.data;
}


export const getTasksByTitle = async (title: string): Promise<Task[]> => {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.get(API_URL, {
            params: { title },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error searching for tasks');
        throw error;
    }
}

export const createTask = async (task: TaskDTO): Promise<Task> => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.post(API_URL, task, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        // if (response.status === 201) {
        //     console.log('Task created successfully:', response.data);
        //     return response.data;
        // }
        return response.data;
    } catch (error) {
        console.log('Error creating task:', error);
        throw error;
    }
    // return response.data;
}

// export const createTask = async (task: any) => {
//     const token = getToken();
    
//     if (!token) {
//         throw new Error('No token found');
//     }
//     try {
//         const response = await axios.post(API_URL, task, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         if (response.status === 201) {
//             console.log('Task created successfully:', response.data);
//             return response.data;
//         }
//     } catch (error) {
//         console.log('Error creating task:', error);
//     }
//     // return response.data;
// }

export const updateTask = async (id: number, task: TaskDTO): Promise<Task>  => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error updating task:', error);
        throw error;
    }
    // return response.data;
}

// deleteTask
export const deleteTask = async (id: number) => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    try{
        const response = await axios.delete(`${API_URL}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 204) {
            console.log('Task deleted successfully');
        }
    } catch (error) {
        console.log('Error deleting task:', error);
    }
        
    // return response.data;
}

export const updateTaskPriority = async (id: number, selectedPriority: Priority) => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.put(`${API_URL}/${id}/priority`, null, {
            params: {priority: selectedPriority},
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error updating task priority:', error);
    }
}


// MUST COMPLETE
// export const searchTask = async (title: string) => {
//     const token = getToken();
//     if (!token) {
//         throw new Error('No token found');
//     }
//     try {
//         const response = await axios.get(`${API_URL}/search`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         console.log(title);
//         return response.data;
//     } catch (error) {
//         console.log('Error searching task', error);
//     }
// }