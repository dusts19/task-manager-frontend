import { User } from "./users";


export interface Task {
    taskid: number;
    tasktitle: string;
    taskdescription: string;
    taskpriority: Priority;
    taskcategory: string;
    taskcompleted: boolean;
    createdDate: string;
    dueDate: string
    user: User;
};

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';


export interface TaskDTO {
    taskid: number,
    tasktitle: string;
    taskdescription: string;
    taskpriority: Priority;
    taskcategory: string;
    taskcompleted: boolean;
    createdDate: string;
    dueDate: string
    userid: number;
}