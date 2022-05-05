import { Role } from './role';

export interface User
{
    id: number;
    email: string;
    fullName: string;
    username: string;
    password: string;
    phone: string;
    urlPicture: string;
    appRoles: Array<Role>;
}