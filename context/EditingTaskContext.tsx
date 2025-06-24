'use client'
import React, { createContext, useContext, useState } from "react";
import { TaskDTO } from "../types/tasks";

type EditingTaskContextType = {
    editingTask: TaskDTO | null;
    setEditingTask: (task: TaskDTO | null) => void;
};

const EditingTaskContext = createContext<EditingTaskContextType | undefined>(undefined)

export const EditingTaskProvider: React.FC<{ children: React.ReactNode }> =({ children }) => {
    const [editingTask, setEditingTask] = useState<TaskDTO | null>(null);

    return (
        <EditingTaskContext.Provider value={{ editingTask, setEditingTask }}>
            {children}
        </EditingTaskContext.Provider>
    );
};

export const useEditingTask = (): EditingTaskContextType => {
    const context = useContext(EditingTaskContext);
    if (!context) {
        throw new Error("useEditingTask must be used within an EditingTaskProvider");
    }
    return context
}