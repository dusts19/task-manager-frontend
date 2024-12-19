import { Task } from './tasks';

export interface User {
    id: number;
    username: string;
    email: string;
    roles: Role[];
    tasks: Task[];
};

export interface Role {
    id: number;
    name: RoleName;
    permission: Permission[];
}

export type RoleName = 'USER' | 'ADMIN' | 'OWNER';

export interface Permission {
    id: number;
    name: string;
}

export interface UserDTO {
    id: number;
    username: string;
}