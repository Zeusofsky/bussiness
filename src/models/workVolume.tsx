export interface IWorkVolume {
    workvolumeid: number,
    contractid: number,
    dateid: number,
    work: string,
    planestimate: number, 
    totalestimate: number, 
    executedsofar: number, 
}

export interface IRequestWorkVolume {
    contractid: number,
    dateid: number,
    work: string,
    planestimate: number, 
    totalestimate: number, 
    executedsofar: number, 
}