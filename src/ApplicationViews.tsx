import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import DiveLog from "./components/dives/Dives";
import Gear from "./components/gear/Gear";
import AddGear from "./components/gear/AddGear";
import LogDive from "./components/dives/LogDive";
import Home from "./Home";
import Login from "./components/Login";
import { Authorized } from "./components/Authorized";
import DivePlanner from "./components/dive_planner/DivePlanner";
import GearItemDetail from "./components/gear/GearItemDetail";
import AddOrEditGearSet from "./components/gear/AddOrEditGearSet";
import Profile from "./components/profile/Profile";
import APIService from "./api/APIService";

export const ApplicationViews = () => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState<string>("");
    const [showMessage, setShowMessage] = React.useState(false);

    React.useEffect(() => {
        // Set up navigation and message handling
        APIService.setNavigate(navigate);
        APIService.setMessageHandler((msg: string) => {
            setMessage(msg);
            setShowMessage(true);
        });
    }, [navigate]);

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    return (
        <>
            <Routes>
                <Route path="*" Component={Login} />
                <Route element={<Authorized />}>
                    <Route path="/" Component={Home} />
                    <Route path="/dives" Component={DiveLog} />
                    <Route path="/dives/logDive" Component={LogDive} />
                    <Route path="/dive-planner" Component={DivePlanner} />
                    <Route path="/gear" Component={Gear} />
                    <Route path="/gear/:gearItemId" Component={GearItemDetail} />
                    <Route path="/gear/add" Component={AddGear} />
                    <Route path="/gear/add-gear-set" Component={AddOrEditGearSet} />
                    <Route path="/gear/gear-set/:gearSetId" Component={AddOrEditGearSet} />
                    <Route path="/profile" Component={Profile} />
                </Route>
            </Routes>
            <Snackbar open={showMessage} autoHideDuration={6000} onClose={handleCloseMessage} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleCloseMessage} severity="info" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
