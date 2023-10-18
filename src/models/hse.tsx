export interface IHse {
    hseid: number,
    contractid: number,
    dateid: number,
    totaloperationdays: number,
    withouteventdays: number,
    deathno: number,
    woundno: number,
    disadvantageeventno: number,
}

export interface IRequestHse {
    contractid: number,
    dateid: number,
    totaloperationdays: number,
    withouteventdays: number,
    deathno: number,
    woundno: number,
    disadvantageeventno: number,
}

