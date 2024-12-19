'use client'
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';

import { createTask } from '../../../../services/taskService';
import { Task, Priority, TaskDTO } from "../../../../types/tasks";
import { User } from "../../../../types/users";
// import { fetchUserById, getCurrentUser } from '../../../../services/userService';
import { fetchUserById } from '../../../../services/userService';


interface TaskFormProps {
    onSave: (task: Task) => void;
    currentUser: User;
    task?: Task;
}


const TaskForm: React.FC<TaskFormProps> = ({ onSave, currentUser, task }) => {
    const [taskTitle, setTaskTitle] = useState(task?.tasktitle || '');
    const [taskDescription, setTaskDescription] = useState(task?.taskdescription || '');
    const [taskPriority, setTaskPriority] = useState<Priority>(task?.taskpriority || 'LOW');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskTitle || !taskDescription) {
            alert("Title and Description are required fields.");
            return;
        }

        const userId = Number(currentUser.id);
        if (Number.isNaN(userId)){
            alert(`Invalid user ID, ${currentUser?.id}, ${userId}`);
        }

        const persistedUser = await fetchUserById(userId);

        const newTask: Omit<Task, 'taskid' | 'user'> = { 
            tasktitle: taskTitle, 
            taskdescription: taskDescription, 
            taskcompleted: task?.taskcompleted || false, 
            taskpriority: taskPriority,
        };

        const payload: TaskDTO = {
            ...newTask,
            userid: persistedUser.id,
        };


        let savedTask;
        try {
            savedTask =await createTask(payload);
            onSave(savedTask);
            setTaskTitle('');
            setTaskDescription('');
            setTaskPriority("LOW")
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please check the console for more details.')
        }
    }

    return(
        <div className="grid border-black border-2 p-2 rounded-md bg-sky-500">
            <form className="grid " onSubmit={handleSubmit}>
                <div className="p-1 inline-flex justify-between ">
                    <label className="mr-12 text-xl">Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                        className="border-2 rounded-md border-black h-fit grow p-1 m-0"
                    />
                </div>
                <div className="p-1 inline-flex justify-between min-w-96">
                    <label className="mr-1 text-xl">Description</label>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                        className="border-2 rounded-md border-black h-48 grow p-1 m-0"
                    />
                </div>
                <div className="p-1 inline-flex justify-between ">
                    <label className="m-1 text-xl">Priority</label>
                    <select value={ taskPriority } 
                        onChange={(e) => setTaskPriority(e.target.value as Priority)}
                        required
                        className="justify-items-center h-fit border-2 rounded-md border-black"
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
                <button className=" border-black border-2 rounded-md p-1 mx-36 bg-red-500 hover:text-white"type="submit">{task ? 'Update Task' : 'Add Task'}</button>
            </form>
        </div>
    );
};

export default TaskForm