
import { User } from "./user";

export interface Employer {
    employerId: number;
    employerCompany: string;
    employerEmail: string;
    employerPhoneNumber: string;
    employerLocation: string;
    employerCity: string;
    
    user: User[];
}
