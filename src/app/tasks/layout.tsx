import type { Metadata } from "next";
import "../globals.css";
import { TaskViewProvider } from "../../../context/TaskViewContext";
// import { UserProvider } from "../../../context/UserContext";
import { TaskProvider } from "../../../context/TaskContext";
import { EditingTaskProvider } from "../../../context/EditingTaskContext";
import ClientSidebarLayout from "./_components/ClientSidebarLayout";


export const metadata: Metadata = {
  title: "Daily Director",
  description: "Manage your tasks with your Daily Director",
};

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <TaskProvider>
            <EditingTaskProvider>
                <TaskViewProvider>
                    <div
                        className="flex flex-1 min-h-0"
                    > 
                        <ClientSidebarLayout>
                          {children}
                        </ClientSidebarLayout>
                        
                    
                    </div>
                </TaskViewProvider>
            </EditingTaskProvider>
        </TaskProvider>
      
  );
}
