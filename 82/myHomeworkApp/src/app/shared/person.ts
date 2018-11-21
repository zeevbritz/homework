import { Address } from "./address";

export interface Person {
    firstName: string;
    lastName: string; 
    // street: string;
    // city: string;
    // state: string;
    // zip: string;
    address: Address;
}
