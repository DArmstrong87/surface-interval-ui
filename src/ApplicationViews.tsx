import { Route, Routes, Outlet } from "react-router-dom"
import Dives from "./components/Dives";
import Home from "./Home";
import TemporaryDrawer from "./components/Navigation";
import Login from "./components/Login";
import { Authorized } from "./components/Authorized";

// Like base html, always show Nav Bar
const Layout = () => {
    return <>
        <TemporaryDrawer />
        <Outlet />
    </>
}


export const ApplicationViews = () => {
    return (
        <>
            <Routes>
                <Route path="*" Component={Login} />
                <Route element={<Authorized />}>
                    <Route path="/" Component={Home} />
                    <Route path="/dives" Component={Dives} />
                </Route>
            </Routes>
        </>
    )
}