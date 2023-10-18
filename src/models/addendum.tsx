export interface IAddendum {
    addendumid: number,
    contractid: number,
    addendumamount_r: number,
    addendumamount_fc: number,
    // addendumamountdate: Date, 
    afteraddendumdate: Date, 
}

export interface IRequestAddendum {
    contractid: number,
    addendumamount_r: number | null,
    addendumamount_fc: number | null,
    afteraddendumdate: string | null, 
}