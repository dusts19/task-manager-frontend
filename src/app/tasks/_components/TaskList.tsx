import React, { FC, useState } from 'react';
import { TaskDTO } from '../../../../types/tasks'

interface TaskListProps {
    tasks: TaskDTO[];
    view: string;
    onDelete: (taskId: number) => void;
    onEdit: (task: TaskDTO) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, view, onDelete, onEdit }) => {
    const [completionFilter, setCompletionFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    const getViewLabel = (view: string) => {
        if (view === 'all') return 'By All';
        if (view === 'priority') return 'By Priority';
        if (view === 'completed') return 'By Completed';
        if (view === 'date') return 'By Date';
        if (view.startsWith('category')) {
            const category = view.split(':')[1];
            return `By Category: ${category}`;
        }
        return 'Custom View'
    }

    const filteredTasks = tasks.filter(task => {
        if (view === 'completed') return task.taskcompleted;
        if (completionFilter === 'completed') return task.taskcompleted;
        if (completionFilter === 'incomplete') return !task.taskcompleted;
        return true;
    })

    return (
        <div className="flex flex-col pb-8 dark:text-[#A0A0A0] dark:border-[#2C2C2C] px-2">
            <div className="flex justify-between items-center mb-4 border-[#2C2C2C] border-b pb-3 dark:border-[#3D3D3D]">
                <h1 className="text-xl dark:text-[#E0E0E0]">
                     <span className="text-lg">Task List</span> - <span className="text-lg">{getViewLabel(view)}</span>
                </h1>

                {view !== 'completed' && (
                    <div className="flex gap-2 items-center text-sm ">
                        <span className="text-gray-700 dark:text-[#E0E0E0] ">Filter:</span>
                        <div className="flex gap-2 ">
                                <button 
                                className={`px-2 py-1 rounded-md border  ${
                                    completionFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-[#1E1E1E] hover:dark:bg-[#252525]'
                                }`}
                                onClick={() => setCompletionFilter('all')}
                            >
                                All
                            </button>
                            <button 
                                className={`px-2 py-1 rounded-md border ${
                                    completionFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-[#1E1E1E] hover:dark:bg-[#252525]'
                                }`}
                                onClick={() => setCompletionFilter('completed')}
                            >
                                Completed
                            </button>
                            <button 
                                className={`px-2 py-1 rounded-md border ${
                                    completionFilter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-[#1E1E1E] hover:dark:bg-[#252525]'
                                }`}
                                onClick={() => setCompletionFilter('incomplete')}
                            >
                                Incomplete
                            </button>
                        </div>
                        
                    </div>
                )}
            </div>
            <ul className={`${filteredTasks.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl-wide:grid-cols-6 gap-4 justify-items-center' : ''}`}>
                {filteredTasks.length === 0 ? (
                    <li className="">{view === 'completed' 
                        ? "You have no tasks completed yet. Finish one first!" 
                        : "You have no tasks yet. Try adding one!"}
                    </li>
                ) : (
                    filteredTasks.map(task => (
                        <li 
                            key={task.taskid} 
                            className={`
                                relative pt-4 pl-6 pr-6 pb-6 rounded-lg 
                                min-h-40 w-60 border-2 flex flex-col justify-between
                                lg:pt-2 lg:px-3 lg:pb-3 
                                dark:bg-[#1E1E1E]
                                ${
                                    task.taskpriority === "HIGH"
                                        ? "border-black hover:shadow-lg hover:shadow-red-500"
                                        : task.taskpriority === "MEDIUM"
                                        ? "border-black hover:shadow-lg hover:shadow-yellow-400"
                                        : "border-black hover:shadow-lg hover:shadow-green-400"
                                } 
                            `}
                            // className={`
                            //     relative pt-2 pl-3 pr-3 pb-3 rounded-md 
                            //     min-h-40 w-60 border-2 flex flex-col justify-between
                            //     ${
                            //         task.taskpriority === "HIGH"
                            //             ? "border-red-500"
                            //             : task.taskpriority === "MEDIUM"
                            //             ? "border-yellow-400"
                            //             : "border-green-400"
                            //     }
                            //  ${
                            //         task.taskpriority === "HIGH"
                            //             ? "border-red-500 hover:shadow-md hover:shadow-red-400"
                            //             : task.taskpriority === "MEDIUM"
                            //             ? "border-yellow-400 hover:shadow-md hover:shadow-yellow-400"
                            //             : "border-green-400 hover:shadow-md hover:shadow-green-400"
                            //     } 
                            //     ${
                            //         task.taskpriority === "HIGH"
                            //             ? "border-black border-2 shadow-md shadow-red-500"
                            //             : task.taskpriority === "MEDIUM"
                            //             ? "border-black border-2 shadow-md shadow-yellow-400"
                            //             : "border-black border-2 shadow-md shadow-green-400"
                            //     } 
                            //     ${
                            //         task.taskpriority === "HIGH"
                            //             ? "border-black border-2 shadow-inner shadow-red-500"
                            //             : task.taskpriority === "MEDIUM"
                            //             ? "border-black border-2 shadow-inner shadow-yellow-400"
                            //             : "border-black border-2 shadow-inner shadow-green-400"
                            //     } 
                            // `}
                        >   
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <span className={`
                                    w-4 h-4 lg:w-3 lg:h-3 rounded-full
                                    ${
                                        task.taskpriority === "HIGH"
                                        ? "bg-red-500"
                                        : task.taskpriority === "MEDIUM"
                                        ? "bg-yellow-400"
                                        : "bg-green-400"
                                    }`}/>
                                <span className="text-sm lg:text-xs font-semibold text-gray-700 dark:text-[#E0E0E0]">
                                    {task.taskpriority.charAt(0) + task.taskpriority.slice(1).toLowerCase()}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 mt-4 flex-1">
                                <h3 className="text-xl lg:text-lg font-semibold truncate dark:text-[#E0E0E0]">
                                    {task.tasktitle}
                                </h3>
                                <p className="text-md lg:text-sm text-gray-600 truncate dark:text-[#E0E0E0]">
                                    {task.taskdescription}
                                </p>
                                <p className="text-md lg:text-sm text-gray-600 dark:text-[#E0E0E0]">
                                    <span className="dark:text-[#A0A0A0]">Category:</span> {task.taskcategory}
                                </p>
                                <p className="text-md lg:text-sm text-gray-600 dark:text-[#E0E0E0]">
                                    <span className="dark:text-[#A0A0A0]">Due:</span> {task.dueDate}
                                </p>
                                <p className="text-md lg:text-sm text-gray-600 dark:text-[#E0E0E0]">
                                    {task.taskcompleted ? "Completed" : "Not completed"}</p>
                            </div>    
                            <div className="flex gap-3 mt-2 text-md lg:text-sm ">
                                <button 
                                    onClick={() => onEdit(task)}
                                    className=" text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.taskid)}
                                    className="text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                            
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList