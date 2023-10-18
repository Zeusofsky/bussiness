export interface IUser {
    id: number;
    first_name: string | null;
    last_name: string | null;
    username: string;
    email: string;
    password: string | null;
    is_active: boolean | null;
}

export interface IUserEdit {
    id: number;
    first_name: string | null;
    last_name: string | null;
    username: string;
    email: string;
    password: string | null;
    is_active: boolean | null;
}

export interface IUserPost {
    first_name: string | null;
    last_name: string | null;
    username: string;
    password: string;
    email: string;
}

export interface IUserPut {
    id: number;
    first_name: string | null;
    last_name: string | null;
    username: string;
    email: string;
    password: string | null;
    is_active: boolean | null;
}

export interface IUserResponse {
    id: number;
    username: string;
    email: string;
    full_name: string;
    user_img: string;
    all_projects_r: boolean | null;
    all_projects_rw: boolean | null;
}