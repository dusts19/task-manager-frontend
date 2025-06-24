'use client'

import React, { useState, createContext, useContext } from "react";

type ViewType = 
    | "add" 
    | "update" 
    | "all" 
    | "category"
    | "priority" 
    | "date"
    | "completed"
    | `category:${string}`;

const TaskViewContext = createContext <{
    view: ViewType;
    setView: (v: ViewType) => void;
} | null>(null)

export const TaskViewProvider = ({ children }: {children: React.ReactNode }) => {
    const [view, setView] = useState<ViewType>("all");

    return (
        <TaskViewContext.Provider value={{view, setView}}>
            {children}
        </TaskViewContext.Provider>
    );
};

export const useTaskView = () => {
    const context = useContext(TaskViewContext);
    if (!context) throw new Error("useTaskView must be used withing TaskViewProvider");
    return context;
};
