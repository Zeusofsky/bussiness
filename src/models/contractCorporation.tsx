export interface ICorporationItem {
    value: number,
    label: string,
}
export interface IContractCorporation {
    E: ICorporationItem[];
    P: ICorporationItem[];
    C: ICorporationItem[];
}