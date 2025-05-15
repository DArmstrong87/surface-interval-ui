import { Route, Routes } from "react-router-dom"
import Dives from "./components/dives/Dives";
import Gear from "./components/gear/Gear";
import AddGear from "./components/gear/AddGear";
import LogDive from "./components/dives/LogDive";
import Home from "./Home";
import Login from "./components/Login";
import { Authorized } from "./components/Authorized";
import DivePlanner from "./components/dive_planner/DivePlanner";
import GearItemDetail from "./components/gear/GearItemDetail";


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
                    <Route path="/gear" Component={Gear} />
                    <Route path="/gear/:gearItemId" Component={GearItemDetail} />
                    <Route path="/gear/add" Component={AddGear} />
                    <Route path="/profile" Component={Dives} />
                </Route>
            </Routes>
        </>
    )
}