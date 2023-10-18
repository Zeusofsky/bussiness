export interface ICriticalAction {
    criticalactionid: number,
    contractid: number,
    dateid: number,
    criticalaction: string,
}

export interface IRequestCriticalAction {
    contractid: number,
    dateid: number,
    criticalaction: string,
}
