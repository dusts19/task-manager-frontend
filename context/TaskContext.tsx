'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { TaskDTO } from '../types/tasks';
import { useUser } from '../context/UserContext'

type TaskContextType = {
    tasks: TaskDTO[];
    addTask: (task: TaskDTO) => Promise<void>;
    updateTask: (task: TaskDTO) => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;
    refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children } : { children: React.ReactNode}) => {
    const { user } = useUser();
    const [tasks, setTasks] = useState<TaskDTO[]>([]);

    const refreshTasks = async () => {
        try{
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }

    useEffect(() => {
        if (user) {
            refreshTasks();
        }
    },[user]);

    const addTask = async (newTask: TaskDTO) => {
        await createTask(newTask);
        await refreshTasks();
    }

    const updateTaskById = async (updatedTask: TaskDTO) => {
        const result = await updateTask(updatedTask);
        setTasks(prev => 
            prev.map(task => task.taskid === result.taskid ? result : task)
        )
    }

    const deleteTaskById = async (taskId: number) => {
        await deleteTask(taskId);
        setTasks(prev => prev.filter(task => task.taskid !== taskId));
    }
    return <TaskContext.Provider value={{tasks, addTask, updateTask: updateTaskById, deleteTask: deleteTaskById, refreshTasks}}>{children}</TaskContext.Provider>
}

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within TaskProvider");
    return context;
}
