import React, { useState, useEffect, useCallback } from "react";
import { planDive } from "./PlanDive";
import { AIR, EANx32, EANx36 } from "./DiveTables";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Divider,
} from "@mui/material";
import OctopusSpinner from "../../OctopusSpinner";
import { loadingSpinnerTime } from "../Constants";

export interface DiveFormState {
    depth: number;
    time: number;
    surfaceInterval: number;
    air: string;
}

export interface DivePlan {
    depth: number;
    startingPressureGroup: string;
    startingPressureIndex: number;
    postDivePressureGroup: string;
    postDivePressureIndex: number;
    safetyStop: { required: boolean; length: number };
    decoLimit: {
        met: boolean;
        warning: string;
    };
    preFlightSI: string;
    ppo: null | {
        value: number;
        warning: string;
    };
    surfaceInterval: number;
    actualBottomTime: number;
    residualNitrogenTime: number;
    totalBottomTime: number;
}

const initialDiveFormState = {
    depth: 0,
    time: 0,
    surfaceInterval: 0,
    air: AIR,
};

function DivePlanner() {
    const [currentDives, setCurrentDives] = useState<DivePlan[]>([]);
    const [diveFormState, setFormState] = useState<DiveFormState>(initialDiveFormState);
    const [prevDivePG, setPrevDivePG] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Listing dives in current plan");
        // Simulate loading for 500ms
        setTimeout(() => setLoading(false), loadingSpinnerTime);
    }, [currentDives]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let intValue = parseInt(value) || 0;
        if (e.target.name === "depth" || e.target.name === "time") {
            intValue = Math.min(intValue, parseInt(e.target.max));
        }
        setFormState({
            ...diveFormState,
            [e.target.name]: intValue,
        });
    };

    const handleSubmit = useCallback(() => {
        // Pass null or the previous dive to factor in the plan
        const previousDive = currentDives.length > 0 ? currentDives[currentDives.length - 1] : null;
        const plannedDive = planDive(diveFormState, previousDive);

        const dive = {
            depth: diveFormState.depth,
            startingPressureGroup: plannedDive.startingPressureGroup,
            startingPressureIndex: plannedDive.startingPressureIndex,
            postDivePressureGroup: plannedDive.postDivePressureGroup,
            postDivePressureIndex: plannedDive.postDivePressureIndex,
            safetyStop: plannedDive.safetyStop,
            decoLimit: plannedDive.decoLimit,
            preFlightSI: plannedDive.preFlightSI,
            ppo: plannedDive.ppo,
            surfaceInterval: diveFormState.surfaceInterval,
            actualBottomTime: diveFormState.time,
            residualNitrogenTime: plannedDive.residualNitrogenTime,
            totalBottomTime: plannedDive.totalBottomTime,
        };

        // Set Previous dive PG to display for Surface Interval
        setPrevDivePG(plannedDive.postDivePressureGroup);

        // Reset form state, but persist air selection for subsequent dives
        const resetFormState = { ...initialDiveFormState };
        resetFormState["air"] = diveFormState.air;
        if (["Y", "Z"].includes(plannedDive.postDivePressureGroup)) {
            resetFormState["surfaceInterval"] = 180;
        }
        setFormState(resetFormState);

        // Update dive list
        setCurrentDives([...currentDives, dive]);
    }, [currentDives, diveFormState]);

    const handleReset = useCallback(() => {
        setCurrentDives([]);
        setFormState(initialDiveFormState);
    }, []);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...diveFormState,
            air: e.target.value,
        });
    };

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <OctopusSpinner size={96} />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Dive Planner
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Plan the dive, dive the plan.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        This dive planner uses the PADI Recreational Dive Planner. It is designed for new Open Water
                        students to practice their dive planning skills as well as anyone planning a single dive or
                        multiple dives. The dive planner informs the diver if a planned dive is relatively safe
                        regarding nitrogen exposure only.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Other factors can increase risk of developing decompression illness beyond depth, time and
                        ascent rate, including dehydration, thermal stress, exertion, general fitness, post-dive air
                        travel, etc. The dive planner can NOT predict diver behavior, dive conditions or in any way
                        ensure dive safety prior to or during a dive. Remember to use a reliable dive computer and
                        always dive within your limits.
                    </Typography>
                </Box>
                {currentDives.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Planned Dives
                        </Typography>
                        {currentDives.map((dive, index) => (
                            <Paper key={`dive-${index}`} sx={{ p: 2, mb: 2, background: "#f5f5f5" }}>
                                {index !== 0 && (
                                    <>
                                        <Typography variant="body2">
                                            Surface Interval: {dive.surfaceInterval} minutes
                                        </Typography>
                                        <Typography variant="body2">
                                            Starting Pressure Group: {dive.startingPressureGroup}
                                        </Typography>
                                    </>
                                )}
                                <Typography variant="body2">Depth: {dive.depth}</Typography>
                                {index !== 0 ? (
                                    <>
                                        <Typography variant="body2">
                                            Actual Bottom Time: {dive.actualBottomTime} minutes
                                        </Typography>
                                        <Typography variant="body2">
                                            + Residual nitrogen time: {dive.residualNitrogenTime} minutes
                                        </Typography>
                                        <Typography variant="body2">
                                            = Total bottom time: {dive.totalBottomTime} minutes
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="body2">Total Bottom Time: {dive.totalBottomTime}</Typography>
                                )}
                                <Typography variant="body2">Pressure Group: {dive.postDivePressureGroup}</Typography>
                                <Typography variant="body2">
                                    Safety Stop Required:{" "}
                                    {dive.safetyStop.required ? `${dive.safetyStop.length} minutes` : "No"}
                                </Typography>
                                <Typography variant="body2">
                                    Pre-flight surface interval:{" "}
                                    {index === 0 && !dive.decoLimit.met
                                        ? "12 hours. If this dive follows multi-day dives, the minimum pre-flight surface interval is 18 hours."
                                        : dive.preFlightSI}
                                </Typography>
                                {dive.ppo !== null && (
                                    <>
                                        <Typography variant="body2">ppO2: {dive.ppo.value}</Typography>
                                        {dive.ppo.value > 1.4 && (
                                            <Typography color="error">{dive.ppo.warning}</Typography>
                                        )}
                                    </>
                                )}
                                {dive.decoLimit.met && (
                                    <Typography color="error" fontWeight={600}>
                                        {dive.decoLimit.warning}
                                    </Typography>
                                )}
                            </Paper>
                        ))}
                    </Box>
                )}
                <Divider sx={{ mb: 3 }} />
                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {currentDives.length > 0 && (
                        <>
                            {(prevDivePG === "Y" || prevDivePG === "Z") && (
                                <Typography color="warning.main" fontWeight={600}>
                                    Previous dive's pressure group is "{prevDivePG}". The minimum suggested surface
                                    interval is 3 hours (180 minutes)
                                </Typography>
                            )}
                            <TextField
                                label="Surface Interval (mins)"
                                name="surfaceInterval"
                                type="number"
                                inputProps={{ min: prevDivePG === "Y" || prevDivePG === "Z" ? 180 : 0 }}
                                value={diveFormState.surfaceInterval || 0}
                                required
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </>
                    )}
                    {currentDives.length === 0 && (
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Air Selection</FormLabel>
                            <RadioGroup row name="air" value={diveFormState.air} onChange={handleRadioChange}>
                                <FormControlLabel value={AIR} control={<Radio />} label="Air" />
                                <FormControlLabel value={EANx32} control={<Radio />} label={EANx32} />
                                <FormControlLabel value={EANx36} control={<Radio />} label={EANx36} />
                            </RadioGroup>
                        </FormControl>
                    )}
                    <TextField
                        label="Depth (ft)"
                        name="depth"
                        type="number"
                        value={diveFormState.depth.toString().replace(/^0+(?=\d)/, "") || 0}
                        required
                        onChange={handleInputChange}
                        inputProps={{ min: 0, max: 140 }}
                        fullWidth
                    />
                    <TextField
                        label="Time (mins)"
                        name="time"
                        type="number"
                        value={diveFormState.time.toString().replace(/^0+(?=\d)/, "") || 0}
                        inputProps={{ min: 0, max: 205 }}
                        required
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button
                            onClick={handleSubmit}
                            id="diveBtn"
                            variant="contained"
                            color="primary"
                            disabled={diveFormState.depth <= 0 || diveFormState.time <= 0}
                            fullWidth
                        >
                            Dive
                        </Button>
                        <Button onClick={handleReset} id="resetBtn" variant="outlined" color="secondary" fullWidth>
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default DivePlanner;
