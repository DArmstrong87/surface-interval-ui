import { Navigate, Outlet } from "react-router-dom";
import TemporaryDrawer from "./Navigation";

export const Authorized = () => {
    const token = localStorage.getItem("si_token");
    if (token && token !== null && token !== undefined) {
        return (
            <>
                <TemporaryDrawer />
                <Outlet />
            </>
        );
    }
    return <Navigate to="/login" replace />;
};
