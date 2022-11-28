import { AccueilConsultExt } from './accueilConsultExt'
export interface Patient{
    patient_id: number;
 //   matricule: string;
    fullname: number;
    age: string;
    sexe: string;
    province: string;
    commune: string;
    zone: string;
    quartierCollineAndSousColline: string;
    rue_avenue: string;
    dateNaissance: Date;
    dateEnregistre: Date;

    accueilConsultExt: AccueilConsultExt[];

}
