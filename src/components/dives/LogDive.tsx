import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../api/APIService";
import { GearSet, Dive } from "../../interfaces";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import OctopusSpinner from "../../OctopusSpinner";
import { loadingSpinnerTime } from "../Constants";

interface LogDiveFormState {
    date: string;
    location: string;
    site: string;
    water: string;
    depth: number;
    time: number;
    description: string;
    startPressure: number;
    endPressure: number;
    tankVol: number;
    gearSet: number;
}

const initialFormState = {
    date: "",
    location: "",
    site: "",
    water: "Fresh",
    depth: 0,
    time: 0,
    description: "",
    startPressure: 0,
    endPressure: 0,
    gearSet: 0,
    tankVol: 80,
};

function LogDive() {
    // STATE
    const [gearSets, setGearSets] = useState<GearSet[]>([]);
    const [formState, setFormState] = useState<LogDiveFormState>(initialFormState);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Set gear sets to populate options
    useEffect(() => {
        APIService.fetchData<GearSet[]>("/gear-sets").then((gearSets) => {
            setGearSets(gearSets);
            setTimeout(() => setLoading(false), loadingSpinnerTime);
        });
    }, []);

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
                <OctopusSpinner />
            </Box>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.type === "number" ? parseInt(e.target.value) : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value,
        });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            water: e.target.value,
        });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            description: e.target.value,
        });
    };

    const handleSelectChange = (e: SelectChangeEvent<number>) => {
        setFormState({
            ...formState,
            gearSet: e.target.value as number,
        });
    };

    const handleLogDiveSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        APIService.sendData<Dive>("dives", formState)
            .then((dive) => {
                if (dive.id) {
                    navigate("../dives");
                }
            })
            .catch((error) => {
                console.error("Error logging dive:", error);
            });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Log Dive
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleLogDiveSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        value={formState.date}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Location"
                        name="location"
                        type="text"
                        value={formState.location}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Site"
                        name="site"
                        type="text"
                        value={formState.site}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Water</FormLabel>
                        <RadioGroup row name="water" value={formState.water} onChange={handleRadioChange}>
                            <FormControlLabel value="Fresh" control={<Radio />} label="Fresh" />
                            <FormControlLabel value="Salt" control={<Radio />} label="Salt" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Depth (ft)"
                        name="depth"
                        type="number"
                        value={formState.depth}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Time (mins)"
                        name="time"
                        type="number"
                        value={formState.time}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formState.description}
                        onChange={handleTextareaChange}
                        multiline
                        minRows={2}
                        fullWidth
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                            label="Start Pressure"
                            name="startPressure"
                            type="number"
                            value={formState.startPressure}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="End Pressure"
                            name="endPressure"
                            type="number"
                            value={formState.endPressure}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <TextField
                        label="Tank Volume (cubic feet)"
                        name="tankVol"
                        type="number"
                        value={formState.tankVol}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="gearSet-label">Gear Set Used</InputLabel>
                        <Select
                            labelId="gearSet-label"
                            id="gearSetSelect"
                            name="gearSet"
                            value={formState.gearSet}
                            label="Gear Set Used"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={0} disabled>
                                Gear Set Used
                            </MenuItem>
                            {gearSets.map((gearSet, index) => (
                                <MenuItem key={`gearSetOption-${index}`} value={gearSet.id}>
                                    {gearSet.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Log Dive
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default LogDive;
