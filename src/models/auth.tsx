import { IUserContractPermission } from "./permission";
import { IUserResponse } from "./user";

export interface IAuth {
    status? : string | null;
    user? : IUserResponse;
    userContractPermissions: IUserContractPermission[];
    authToken : string ;
}

export interface IChangePassword {
    userid : number;
    username : string;
    currentpassword : string;
    newpassword: string;
}