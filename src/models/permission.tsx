export interface IPermission {
    permission: string;
}

export interface IUserContractPermission {
    userid: number;
    contractid: number;
    permissions: IPermission[];
}
