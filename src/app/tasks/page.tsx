"use client"

import React, { useState, useEffect, FC } from "react";
import TaskForm from './_components/TaskForm';
import TaskList from './_components/TaskList';
import { getTasks, updateTask, deleteTask } from "../../../services/taskService";
import { TaskDTO } from "../../../types/tasks";
import { User } from "../../../types/users";
// import TaskSearch from "../TaskSearch/TaskSearch";
import { getCurrentUser } from "../../../services/userService";


const TaskPage: FC = () => {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [editingTask, setEditingTask] = useState<TaskDTO | null>(null);
    // const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchUserAndTasks = async () => {
            try{
                const user = await getCurrentUser();

                setCurrentUser(user);

                const data = await getTasks();

                setTasks(Array.isArray(data) ? data: []);
            } catch (error) {
                console.error("Error fetching user or tasks:", error);
                setTasks([]);
            }
        };
        fetchUserAndTasks();
    }, []);







    const handleSave = async () => {
        try{
            const data = await getTasks();
            setTasks(data)
        }catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }

    // const handleSave = (savedTask: TaskDTO) => {
    //     setTasks([...tasks, savedTask]);
    // }


    const handleUpdate = async ( updatedTask: TaskDTO ) => {
        console.log("Updating task from taskpage:", updatedTask.taskid);
        console.log("Updating Task object from taskpage:", updatedTask);
        try {
            console.log("updatedTask: ", updatedTask.userid)
            if (!updatedTask.userid) {
                throw new Error('User id is missing in the updated task.');
            }
            const updated = await updateTask(updatedTask.taskid, updatedTask);



            setTasks((prevTasks) => prevTasks.map((task) => 
                (task.taskid === updated.taskid ? updated : task)
            ));


            setEditingTask(null);
        } catch (error) {
            console.error(`Error updating task: ${error}`)
        }
        // setTasks([...task])
    }

    const handleDelete = async (taskId: number) => {
        try {
            await deleteTask(taskId);
            setTasks((prevtasks) => prevtasks.filter((task) => task.taskid !== taskId));
        } catch (error) {
            console.error(`Error deleting task: ${error}`);
        }
    };


    // const handleSearch = async (term: string) => {
    //     setSearchTerm(term);
    //     if (term){
    //         try {
    //             const userTasks = await getTasksByTitle(term);
    //             setTasks(userTasks);
    //         } catch (error) {
    //             console.error("Error searching tasks:", error);
    //         }
    //     } else {
    //         setTasks([]);
    //     }
        
    // }

    console.log("Fetched tasks in:", tasks);

    return (
        <div className="grid ">
            
            {currentUser && <p className="flex justify-self-center justify-center bg-white m-2 text-2xl w-1/4 max-h-10 pt-1 rounded-md border-gray-500 border-2 border-double">Welcome {currentUser.username}!</p>}

            {/* <TaskSearch onSearch={handleSearch} />
            {searchTerm && tasks.map(task => (
                <div key={task.taskid}>{task.tasktitle}</div>
            ))} */}
            {/* <TaskForm onSave={handleSave} /> */}
            

            <div className="flex justify-center mb-16">
                {currentUser && 
                    <TaskForm 
                        onSave={handleSave} 
                        currentUser={currentUser}
                        task={editingTask}
                        onUpdate={handleUpdate}
                    />
                }
            </div>
            <div className="flex mt-4 ">
                {currentUser && <TaskList 
                    tasks={ tasks } 
                    onDelete={ handleDelete }
                    onEdit={ (task: TaskDTO) => setEditingTask(task) }
                    />
                }
            </div>

        </div>
    );
}

export default TaskPage;