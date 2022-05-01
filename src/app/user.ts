import { Role } from './role';

export interface User
{
    id: number;
    email: string;
    fullName: string;
    username: string;
    password: string;
    urlPicture: string;
    role: Array<Role>;
}