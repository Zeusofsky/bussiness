export interface IPmsProgress {
    pmsprogressid: number,
    contractid: number,
    dateid: number,
    item: string,
    lastplanprogress: number, 
    lastplanvirtualprogress: number, 
}

export interface IRequestPmsProgress {
    contractid: number,
    dateid: number,
    item: string,
    lastplanprogress: number, 
    lastplanvirtualprogress: number, 
}