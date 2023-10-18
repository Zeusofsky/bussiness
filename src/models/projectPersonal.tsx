export interface IProjectPersonal {
    projectpersonelid: number,
    contractid: number,
    dateid: number,
    year: string,
    month: string,
    dpno: number,
    dcpno: number,
    mepno: number,
    tpno: number,
    description: string,
}

export interface IRequestProjectPersonal {
    contractid: number,
    dateid: number,
    dpno: number,
    dcpno: number,
    mepno: number,
    description: string,
}