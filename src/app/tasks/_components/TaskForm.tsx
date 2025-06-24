'use client';

import React, { useState, useEffect } from 'react';

import { createTask, updateTask } from '../../../../services/taskService';
import { Task, Priority, TaskDTO } from "../../../../types/tasks";
import { User } from "../../../../types/users";

import { fetchUserById } from '../../../../services/userService';


interface TaskFormProps {
    onSave: () => void;
    onUpdate: (task: TaskDTO) => void;
    onCancelEdit: () => void;
    currentUser: User;
    task?: TaskDTO | null;
}


const TaskForm: React.FC<TaskFormProps> = ({ onSave, onUpdate, onCancelEdit, currentUser, task }) => {
    const [taskTitle, setTaskTitle] = useState(task?.tasktitle || '');
    const [taskDescription, setTaskDescription] = useState(task?.taskdescription || '');
    const [taskPriority, setTaskPriority] = useState<Priority>(task?.taskpriority || 'LOW');
    const [taskCategory, setTaskCategory] = useState(task?.taskcategory || '');
    const [userSelectedDueDate, setUserSelectedDueDate] = useState(task?.dueDate || '');
    const [taskCompleted, setTaskCompleted] = useState(task?.taskcompleted || false);

    useEffect(() => {
        if (task) {
            setTaskTitle(task.tasktitle);
            setTaskDescription(task.taskdescription);
            setTaskPriority(task.taskpriority);
            setTaskCategory(task.taskcategory);
            setUserSelectedDueDate(task.dueDate);
            setTaskCompleted(task.taskcompleted)
        } else {
            setTaskTitle("");
            setTaskDescription("");
            setTaskPriority("LOW");
            setTaskCategory("");
            setUserSelectedDueDate(new Date().toISOString().slice(0, 10));
            setTaskCompleted(false)
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
            return;
        }
        if (new Date(userSelectedDueDate) < new Date(new Date().toISOString().slice(0, 10))) {
            alert("Due date cannot be in the past.");
            return;
        }

        const persistedUser = await fetchUserById(userId);

        const newTask: Omit<Task, 'taskid' | 'user'> = { 
            tasktitle: taskTitle, 
            taskdescription: taskDescription, 
            taskpriority: taskPriority,
            taskcategory: taskCategory.charAt(0).toUpperCase() + taskCategory.slice(1).toLowerCase(),
            taskcompleted: taskCompleted, 
            createdDate: task?.createdDate || new Date().toISOString(),
            dueDate: userSelectedDueDate 
                ? new Date(userSelectedDueDate).toISOString() 
                : new Date().toISOString(),
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
                savedTask = await updateTask(payload);
                await onUpdate(payload);
            } else {
                console.log('creating task', payload);
                savedTask = await createTask(payload);
                console.log('created task after backend in taskForm', savedTask)
                await onSave();
            }

            setTaskTitle('');
            setTaskDescription('');
            setTaskPriority("LOW");
            setTaskCategory('');
            setUserSelectedDueDate('');
            setTaskCompleted(false);

        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please check the console for more details.')
        }
    }

    return(
        <div className="max-w-lg w-full mx-auto bg-white border-gray-300 border-2 rounded-md shadow-md p-6  dark:bg-[#1E1E1E] dark:border-[#2C2C2C] dark:text-[#E0E0E0]">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col ">
                    <label className="text-sm font-semibold text-gray-700  mb-1 dark:text-[#A0A0A0]">Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                        className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col ">
                    <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-[#A0A0A0]">Description</label>
                    <textarea
                        maxLength={1000}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                        className="border border-gray-400 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-xs text-right dark:text-[#A0A0A0]">{taskDescription.length}/1000</p>
                </div>
                <div className="flex flex-col ">
                    <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-[#A0A0A0]">Category</label>
                    <input
                        type="category"
                        value={taskCategory}
                        onChange={(e) => setTaskCategory(e.target.value)}
                        required
                        className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex gap-4  xs:flex-col">
                    <div className="flex flex-col flex-1">
                        <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-[#A0A0A0]">Due Date</label>
                        <input
                            type="date"
                            value={userSelectedDueDate.slice(0, 10)}
                            onChange={(e) => setUserSelectedDueDate(e.target.value)}
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-[#E0E0E0]"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-[#A0A0A0]">Priority</label>
                        <select value={ taskPriority } 
                            onChange={(e) => setTaskPriority(e.target.value as Priority)}
                            required
                            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-[#E0E0E0]"
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-sm font-semibold text-gray-700 mb-1 dark:text-[#A0A0A0]">Completed</label>
                        <input
                            type="checkbox"
                            checked={taskCompleted}
                            onChange={(e) => setTaskCompleted(e.target.checked)}
                            className="w-5 h-5 accent-blue-500 mt-2"
                        />
                    </div>
                </div>
                
                <div className="pt-2">
                    <button 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors dark:text-[#E0E0E0]"
                    type="submit"
                    >
                        {task ? 'Update Task' : 'Add Task'}
                    </button>
                    {task && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="mt-2 w-full text-center text-gray-600 dark:text-[#E0E0E0] hover:underline  dark:hover:bg-[#242424] dark:rounded-md py-2"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>
                
            </form>
        </div>
    );
};

export default TaskForm