"use client"

import React, { FC, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from './_components/TaskForm';
import TaskList from './_components/TaskList';
import { TaskDTO } from "../../../types/tasks";
import { useTaskView } from "../../../context/TaskViewContext";
import { useEditingTask } from "../../../context/EditingTaskContext";
import { useTask } from "../../../context/TaskContext";;
import { useUser } from "../../../context/UserContext";


const TaskPage: FC = () => {
    const { tasks, refreshTasks, updateTask, deleteTask } = useTask();
    const {user} = useUser();
    const { view, setView } = useTaskView();
    const { editingTask, setEditingTask } = useEditingTask();

    const filteredTasks = useMemo(() => {
        if (view === 'all') {
            return tasks
        }
        if (view.startsWith("category:")) {
            const category = view.split(":")[1];
            return tasks.filter(task => task.taskcategory === category);
        }

        switch (view) {
            case "completed":
                return tasks.filter(task => task.taskcompleted);
            case "priority":
                return [...tasks].sort((a, b) => {
                    const order = { LOW: 1, MEDIUM: 2, HIGH: 3 };
                    return order[b.taskpriority] - order[a.taskpriority];
                });
            case "category":
                return [...tasks].sort((a, b) => a.taskcategory.localeCompare(b.taskcategory));
            case "date":
                return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            // case "newest":
            //     return [...tasks].sort((a, b) => new Date(b.createdDate).getTime() - new Date(b.createdDate).getTime());
            default:
                return tasks;
        }
    }, [view, tasks])

    const handleSave = async () => {
        try{
            await refreshTasks();
        }catch (error) {
            console.error("Failed to save task:", error);
        }
    }

    const handleUpdate = async ( updatedTask: TaskDTO ) => {
        try {
            await updateTask(updatedTask);

        } catch (error) {
            console.error(`Error updating task: ${error}`)
        }
    }

    const handleDelete = async (taskId: number) => {
        try {
            await deleteTask(taskId);
        } catch (error) {
            console.error(`Error deleting task: ${error}`);
        }
    };



    console.log("Fetched tasks in:", tasks);

    return (
        <div className="flex h-full pb-12 overflow-y-auto">
            <main className="flex-1 ">
            
                {/* <TaskSearch onSearch={handleSearch} />
                {searchTerm && tasks.map(task => (
                    <div key={task.taskid}>{task.tasktitle}</div>
                ))} */}
                {/* <TaskForm onSave={handleSave} /> */}
                
                <AnimatePresence mode="wait">
                    {(view === "add" || editingTask) && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user && 
                                <TaskForm 
                                    onSave={async () => {
                                        handleSave();
                                        setEditingTask(null);
                                        setView("all");
                                    }}
                                    onUpdate={async (task) => {
                                        await handleUpdate(task);
                                        setEditingTask(null);
                                        setView("all");
                                    }}
                                    onCancelEdit={() => setEditingTask(null)}
                                    currentUser={user}
                                    task={editingTask}
                                />
                            }
                        </motion.div>
                    )}
                    {view === "all" && (
                        <motion.div
                            key="all"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user && 
                                <TaskList 
                                    tasks={ tasks }
                                    view={ view }
                                    onDelete={ handleDelete }
                                    onEdit={ (task: TaskDTO) => {
                                        setEditingTask(task);
                                        setView("add");
                                    }}
                                    />
                            }
                        </motion.div>
                    )}
                    
                    {view === "priority" && (
                        <motion.div
                            key="priority"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user && 
                                <TaskList 
                                    tasks={ filteredTasks }
                                    view={ view }
                                    onDelete={ handleDelete }
                                    onEdit={ (task: TaskDTO) => {
                                        setEditingTask(task);
                                        setView("add");
                                    }}
                                    />
                            }
                        </motion.div>
                    )}
                    {view === "category" && (
                        <motion.div
                            key="category"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user && 
                                <TaskList 
                                    tasks={ filteredTasks }
                                    view={ view }
                                    onDelete={ handleDelete }
                                    onEdit={ (task: TaskDTO) => setEditingTask(task) }
                                    />
                            }
                        </motion.div>
                    )}
                    {view.startsWith("category:") && (
                        <motion.div
                            key={view}
                            initial={{opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user &&
                                <TaskList 
                                    tasks={ filteredTasks } 
                                    view={ view }
                                    onDelete={ handleDelete }
                                    onEdit={ (task: TaskDTO) => {
                                        setEditingTask(task);
                                        setView("add");
                                    }}
                                    />
                            }
                        </motion.div>
                    )}
                    {view === "date" && (
                        <motion.div
                            key="date"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user && 
                                <TaskList 
                                    tasks={ filteredTasks } 
                                    view={ view }
                                    onDelete={ handleDelete }
                                    onEdit={ (task: TaskDTO) => {
                                        setEditingTask(task);
                                        setView("add");
                                    }}
                                    />
                            }
                        </motion.div>
                    )}
                    {view === "completed" && (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {user && 
                                <TaskList 
                                    tasks={ filteredTasks } 
                                    view={ view }
                                    onDelete={ handleDelete }
                                    onEdit={ (task: TaskDTO) => {
                                        setEditingTask(task);
                                        setView("add");
                                    }}
                                    />
                            }
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
        
    );
}

export default TaskPage;