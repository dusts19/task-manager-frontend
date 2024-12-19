import { User } from "./users";


export interface Task {
    taskid: number;
    tasktitle: string;
    taskdescription: string;
    taskpriority: Priority;
    taskcompleted: boolean;
    user: User;
};

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';


export interface TaskDTO {
    tasktitle: string;
    taskdescription: string;
    taskcompleted: boolean;
    taskpriority: Priority;
    userid: number;
}