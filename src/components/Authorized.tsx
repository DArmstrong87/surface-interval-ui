import { Navigate, Outlet } from "react-router-dom"
import TemporaryDrawer from "./Navigation";

export const Authorized = () => {
    if (localStorage.getItem("si_token")) {
        return <>
            <TemporaryDrawer />
            <main className="p-4">
                <Outlet />
            </main>
        </>
    }
    return <Navigate to='/login' replace />
}