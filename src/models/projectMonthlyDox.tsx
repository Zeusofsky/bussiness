export interface IProjectMonthlyDoc {
    projectmonthlydoxid: number,
    contractid: number,
    dateid: number,
    year: string,
    month: string,
    description: string,
    file: File | null,
    filename: string,
    active: boolean,
}

export interface IRequestProjectMonthlyDoc {
    contractid: number,
    dateid: number,
    description: string,
    file: File | null,
    active: boolean,
}

export interface IRequestPartialProjectMonthlyDoc{
    contractid: number,
    dateid: number,
    description: string,
}