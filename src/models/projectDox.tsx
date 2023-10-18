export interface IProjectDoc {
    projectdoxid: number,
    contractid: number,
    dateid: number,
    doctitle: number,
    dockind: number,
    docno: number,
    file: File | null,
    filename: string,
    active: boolean,
}

export interface IRequestProjectDoc {
    contractid: number,
    dateid: number,
    doctitle: number,
    dockind: number,
    docno: number,
    file: File | null,
    active: boolean,
}

export interface IRequestPartialProjectDoc{
    contractid: number,
    dateid: number,
    doctitle: number,
    dockind: number,
    docno: number,
}