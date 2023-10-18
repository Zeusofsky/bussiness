
export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    countryCode: string;
    phoneNumber: string;
    email: string;
    bankAccountNumber: string;
}

export interface ICustomerEdit {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    countryCode: string;
    phoneNumber: string;
    email: string;
    bankAccountNumber: string;
    edited: string | null;
    deleted: string | null;
}

export interface ICustomerPost {
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    CountryCode: string;
    PhoneNumber: string;
    Email: string;
    BankAccountNumber: string;
}

export interface ICustomerPut {
    Id: number;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    CountryCode: string;
    PhoneNumber: string;
    Email: string;
    BankAccountNumber: string;
}