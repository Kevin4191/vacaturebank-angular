
import { User } from "./user";

export class Employer {
    employerId!: number;
    employerCompany!: string;
    employerEmail!: string;
    employerPhoneNumber!: string;
    employerLocation!: string;
    employerCity!: string;
    
    user!: User[];
}
