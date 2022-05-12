import { Acceuil } from './acceuil';
export interface Patient{
    id: number;
    patientId: string;
    fullName: string;
    age: any;
    sexe: string;
    province: string;
    commune: string;
    zone: string;
    colline: string;
    phone: string;
    quartier: string;
    avenue: string;
    accueils: Acceuil[];
}