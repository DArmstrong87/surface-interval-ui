import { Route, Routes } from "react-router-dom"
import Dives from "./components/Dives";
import Home from "./Home";
import Login from "./components/Login";
import { Authorized } from "./components/Authorized";


export const ApplicationViews = () => {
    return (
        <>
            <Routes>
                <Route path="*" Component={Login} />
                <Route element={<Authorized />}>
                    <Route path="/" Component={Home} />
                    <Route path="/dives" Component={Dives} />
                    <Route path="/dive-planner" Component={Dives} />
                    <Route path="/gear" Component={Dives} />
                    <Route path="/profile" Component={Dives} />
                </Route>
            </Routes>
        </>
    )
}