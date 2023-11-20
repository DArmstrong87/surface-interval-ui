import { Route, Routes } from "react-router-dom"
import Dives from "./components/dives/Dives";
import LogDive from "./components/dives/LogDive";
import Home from "./Home";
import Login from "./components/Login";
import { Authorized } from "./components/Authorized";
import DivePlanner from "./components/dive_planner/DivePlanner";


export const ApplicationViews = () => {
    return (
        <>
            <Routes>
                <Route path="*" Component={Login} />
                <Route element={<Authorized />}>
                    <Route path="/" Component={Home} />
                    <Route path="/dives" Component={Dives} />
                    <Route path="/dives/logDive" Component={LogDive} />
                    <Route path="/dive-planner" Component={DivePlanner} />
                    <Route path="/gear" Component={Dives} />
                    <Route path="/profile" Component={Dives} />
                </Route>
            </Routes>
        </>
    )
}