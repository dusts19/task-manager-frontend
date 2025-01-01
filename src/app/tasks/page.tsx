"use client"

import React, { useState, useEffect, FC } from "react";
import TaskForm from './_components/TaskForm';
import TaskList from './_components/TaskList';
import { getTasks, deleteTask } from "../../../services/taskService";
// import { getTasks, getTasksByTitle } from "../../services/taskService";
import { Task } from "../../../types/tasks";
import { User } from "../../../types/users";
// import TaskSearch from "../TaskSearch/TaskSearch";
// import {jwtDecode} from 'jwt-decode';
import { getCurrentUser } from "../../../services/userService";

// const getToken = () => localStorage.getItem('token');

const TaskPage: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [shouldFetchTasks, setShouldFetchTasks] = useState(false);


    // useEffect(() => {
    //     const fetchUserAndTasks = async () => {
    //         try{
    //             const user = await getCurrentUser();
    //             setCurrentUser(user);
    //             const data = await getTasks();
    //             setTasks(Array.isArray(data) ? data: []);
    //         } catch (error) {
    //             console.error(`Error fetching user or tasks: ${error}`);
    //             setTasks([]);
    //         }
    //     };
    //     fetchUserAndTasks();
    // }, []);
    useEffect(() => {
        const fetchUserAndTasks = async () => {
            try{
                const user = await getCurrentUser();
                console.log(`Raw response: ${user}`)

                setCurrentUser(user);

                const data = await getTasks();
                console.log(`Fetched tasks: ${data}`)

                setTasks(Array.isArray(data) ? data: []);
            } catch (error) {
                console.error(`Error fetching user or tasks: ${error}`);
                setTasks([]);
            }
        };
        fetchUserAndTasks();
    }, []);

    // useEffect(() => {
    //     const token = getToken();
        
    //     if (token) {
    //         const decodedUser: User = jwtDecode(token);
    //         setCurrentUser(decodedUser);
    //         setShouldFetchTasks(true);
    //     }
    // }, []);
    // useEffect(() => {
    //     if (shouldFetchTasks) {
    //         const fetchTasks = async () => {
    //             try {
    //                 const data = await getTasks();
    //                 console.log("Fetched tasks:", data);
    //                 if (Array.isArray(data)) {
    //                     setTasks(data);
    //                 } else {
    //                     setTasks([]);
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching tasks:", error);
    //                 setTasks([]);
    //             }
    //         };
    //         fetchTasks();
    //         setShouldFetchTasks(false);
    //     }
    // }, [shouldFetchTasks]);




    // useEffect(() => {
    //     const token = getToken();

    //     if (token) {
    //         const decodedUser: User = jwtDecode(token);
    //         setCurrentUser(decodedUser);
    //     }
    //     const fetchTasks = async () => {
    //         try {
    //             const data = await getTasks();
    //             setTasks(data)
    //         } catch (error) {
    //             console.error("Error fetching tasks:", error);
    //             setTasks([]);
    //         }
    //     };
    //         fetchTasks();
    // }, []);

    const handleSave = (savedTask: Task) => {
        setTasks([...tasks, savedTask]);
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

    console.log('Fetched tasks in:', tasks);

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
                        
                    />
                }
            </div>
            <div className="flex mt-4 ">
                {currentUser && <TaskList 
                    tasks={tasks} 
                    onDelete={handleDelete}
                    />
                }
            </div>

        </div>
    );
}

export default TaskPage;