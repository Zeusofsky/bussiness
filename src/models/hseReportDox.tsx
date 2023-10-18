export interface IHseReportDoc {
    hsereportdoxid: number,
    contractid: number,
    dateid: number,
    year: string,
    month: string,
    description: string,
    file: File | null,
    filename: string,
    active: boolean,
}

export interface IRequestHseReportDoc {
    contractid: number,
    dateid: number,
    description: string,
    file: File | null,
    active: boolean,
}

export interface IRequestPartialHseReportDoc{
    contractid: number,
    dateid: number,
    description: string,
}