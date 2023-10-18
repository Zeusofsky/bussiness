export interface IMachinery {
    machinaryid: number,
    contractid: number,
    dateid: number,
    machine: string,
    activeno: number, 
    inactiveno: number, 
    description: string,
}

export interface IRequestMachinery {
    contractid: number,
    dateid: number,
    machine: string,
    activeno: number, 
    inactiveno: number, 
}