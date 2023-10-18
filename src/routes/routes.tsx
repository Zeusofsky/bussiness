import { FC }  from "react";
import { connect, ConnectedProps } from "react-redux";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";

import { IRoute } from "../types/RouteType";
import { 
    routes as dashboardRoutes, 
    // authRoutes 
} from "./index";
import { MainLayout, AuthLayout, ChangePasswordLayout } from "../layouts";
import { RootState } from '../redux/store/store';
// import { isExists } from "date-fns";
import SignIn from "../pages/security/authentication/signIn";
import ChangePassword from "../pages/security/authentication/changePassword";
// import { useAppSelector } from "../redux/store/hooks";


const ModifiedMainLayout = () => {
    return (
        <MainLayout>
            <Outlet />  
        </MainLayout>
    )
    };
    
const ModifiedAuthLayout = () => {
    return (
        <AuthLayout>
            <Outlet />  
        </AuthLayout>
    )
};

const ModifiedChangePasswordLayout = () => {
    return (
        <ChangePasswordLayout>
            <Outlet />  
        </ChangePasswordLayout>
    )
};

const AppRoutes: FC<AppRoutesProps> = ({ token, isPasswordChanged }) => {
    const authToken = sessionStorage.getItem("token")
    // console.log('token        : ', token)
    // console.log('ROUTE session token: ', authToken)
    const isAuthenticated = token !== null 
     && authToken !== null && token === authToken
    // console.log("isAuthenticated2: ", isAuthenticated)

    return (
        <>
        {isAuthenticated ?
            (isPasswordChanged ?
                <Routes>
                    <Route element={<ModifiedChangePasswordLayout/>}>
                        <Route
                            path={'/auth/changepassword'}
                            element={<ChangePassword />}
                        />
                    </Route>
                    <Route
                        path={'/'}
                        element={<Navigate to='/auth/changepassword' replace={true}/>}
                    />
                </Routes>
                :
                <Routes>
                    <Route element={<ModifiedMainLayout/>}>
                    {dashboardRoutes.map((route: IRoute) => (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                    </Route>
                </Routes>
            )
            :
            <Routes>
                <Route element={<ModifiedAuthLayout/>}>
                {/* {authRoutes.map((route: IRoute) => ( */}
                    <Route
                        path={'/auth/sign-in'}
                        element={<SignIn />}
                    />
                {/* ))} */}
                </Route>
                <Route
                    path={'/'}
                    element={<Navigate to='/auth/sign-in' replace={true}/>}
                />
            </Routes>
        }   
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.authToken,
    isPasswordChanged: state.auth.isPasswordChanged,
});

const mapDispatchToProps = () => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppRoutesProps = ConnectedProps<typeof connector>;

export default connector(AppRoutes)
