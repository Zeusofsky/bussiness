export interface IContractorDoc {
    contractordoxid: number,
    contractid: number,
    contractshamsidate: string,
    contractdate: Date,
    contracttitle: string,
    contractor: string,
    contractno: string,
    riderno: number,
    file: File | null,
    filename: string,
}

export interface IRequestContractorDoc {
    contractid: number,
    contractdate: Date,
    contracttitle: string,
    contractor: string,
    contractno: string,
    riderno: number,
    file: File | null,
}

export interface IRequestPartialContractorDoc{
    contractid: number,
    contractdate: Date,
    contracttitle: string,
    contractor: string,
    contractno: string,
    riderno: number,
}