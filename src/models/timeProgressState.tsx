export interface ITimeProgressState {
    timeprogressstateid: number,
    contractid: number,
    dateid: number,
    year: string,
    month: string,
    plan_replan: string,
    eep_date: Date,
    eep_shamsiDate: string;
    eee_date: Date,
    eee_shamsiDate: string;
    epp_date: Date,
    epp_shamsiDate: string;
    epe_date: Date,
    epe_shamsiDate: string;
    ecp_date: Date,
    ecp_shamsiDate: string;
    ece_date: Date,
    ece_shamsiDate: string;
    epjp_date: Date,
    epjp_shamsiDate: string;
    epje_date: Date,
    epje_shamsiDate: string;
    description: string,
}

export interface IRequestTimeProgressState {
    contractid: number,
    dateid: number,
    plan_replan: string,
    eep_date: string,
    eee_date: string,
    epp_date: string,
    epe_date: string,
    ecp_date: string,
    ece_date: string,
    epjp_date: string,
    epje_date: string,
    description: string,
}