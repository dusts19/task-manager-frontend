// import React, { FC, useState, useEffect } from 'react';
import React, { FC } from 'react';
import { TaskDTO } from '../../../../types/tasks'
// import {getTasks} from '../../services/taskService'

interface TaskListProps {
    tasks: TaskDTO[];
    onDelete: (taskId: number) => void;
    onEdit: (task: TaskDTO) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
    return (
        <div className="bg-yellow-200 w-full grid pt-6 lg:min-h-96">
            <div className=" w-full">
                <h1 className=" text-xl text-center ">Task List</h1>
            </div>
            <ul className="flex flex-col w-full px-2">
                {tasks.length === 0 ? (
                    <li className="text-center text-gray-500 p-4">No tasks available</li>
                ) : (
                    tasks.map(task => (
                        <li key={task.taskid} className="border-b-slate-500 border-2 text-lg py-1 pr-2 mb-1">
                            <div className="flex flex-row   ml-8">
                                <p className="px-2 max-w-48 min-w-36">{task.tasktitle}</p>
                                <p className="px-4 grow">{task.taskdescription}</p>
                                <p className="px-2 shrink">{task.taskpriority}</p>
                                <p className="px-2 mr-6">{task.taskcompleted}</p>
                                <button 
                                    onClick={() => onEdit(task)}
                                    className="text-blue-500 px-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.taskid)}
                                    className="text-red-500 px-4"
                                >
                                    X
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