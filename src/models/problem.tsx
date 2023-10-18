export interface IProblem {
    problemid: number,
    contractid: number,
    dateid: number,
    problem: string,
}

export interface IRequestProblem {
    contractid: number,
    dateid: number,
    problem: string,
}