'use client'
import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';

import { createTask, updateTask } from '../../../../services/taskService';
import { Task, Priority, TaskDTO } from "../../../../types/tasks";
import { User } from "../../../../types/users";

// import { fetchUserById, getCurrentUser } from '../../../../services/userService';
import { fetchUserById } from '../../../../services/userService';


interface TaskFormProps {
    onSave: (task: TaskDTO) => void;
    onUpdate: (task: TaskDTO) => void;
    currentUser: User;
    task?: TaskDTO | null;
}


const TaskForm: React.FC<TaskFormProps> = ({ onSave, onUpdate, currentUser, task }) => {
    const [taskTitle, setTaskTitle] = useState(task?.tasktitle || '');
    const [taskDescription, setTaskDescription] = useState(task?.taskdescription || '');
    const [taskPriority, setTaskPriority] = useState<Priority>(task?.taskpriority || 'LOW');
    const [taskCompleted, setTaskCompleted] = useState(task?.taskcompleted || false);

    useEffect(() => {
        if (task) {
            setTaskTitle(task.tasktitle);
            setTaskDescription(task.taskdescription);
            setTaskPriority(task.taskpriority)
            setTaskCompleted(task.taskcompleted)
        }
    }, [task])

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
            taskpriority: taskPriority,
            taskcompleted: task?.taskcompleted || false, 
        };

        const payload: TaskDTO = {
            ...newTask,
            userid: persistedUser.id,
            taskid: task?.taskid || 0,
        };


        let savedTask;
        try {
            if (task) {
                console.log('updating task')
                savedTask = await updateTask(task.taskid, payload);
                onUpdate(payload);
            } else {
                console.log('creating task', payload);
                savedTask = await createTask(payload);
                console.log('created task after backend in taskForm', savedTask)
                onSave(savedTask);
            }

            setTaskTitle('');
            setTaskDescription('');
            setTaskPriority("LOW")
            setTaskCompleted(false);

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
                <div className="">
                    <label className="">Completed</label>
                    <input
                        type="checkbox"
                        checked={taskCompleted}
                        onChange={(e) => setTaskCompleted(e.target.checked)}
                        className=" border-2 rounded-md border-black"
                    />
                </div>
                <button 
                    className=" border-black border-2 rounded-md p-1 mx-36 bg-red-500 hover:text-white"
                    type="submit"
                >
                    {task ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm