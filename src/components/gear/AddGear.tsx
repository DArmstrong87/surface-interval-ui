import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../api/APIService";
import { GearType, CustomGearType, GearItemService, GearItem } from "../../interfaces";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    Alert,
    SelectChangeEvent,
} from "@mui/material";
import OctopusSpinner from "../../OctopusSpinner";
import { loadingSpinnerTime } from "../Constants";

interface NewGearItemFormState {
    gearTypeId: number | null;
    customGearTypeId: number | null;
    newCustomGearType: string;
    name: string;
}

const newGearItemInitial: NewGearItemFormState = {
    gearTypeId: null,
    customGearTypeId: null,
    newCustomGearType: "",
    name: "",
};

const newGearItemServiceInitial: GearItemService = {
    purchaseDate: "",
    serviceDate: "",
    diveInterval: 0,
    dayInterval: 0,
};

function AddGear() {
    const navigate = useNavigate();
    const [gearTypes, setGearTypes] = useState<GearType[]>([]);
    const [customGearTypes, setCustomGearTypes] = useState<CustomGearType[]>([]);
    const [trackService, setTrackService] = useState(false);
    const [newGearItemFormState, setNewGearItemForm] = useState<NewGearItemFormState>(newGearItemInitial);
    const [newGearItemServiceState, setNewGearItemService] = useState<GearItemService>(newGearItemServiceInitial);
    const [gearTypeError, setGearTypeError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [gearTypes, customGearTypes] = await Promise.all([APIService.fetchData<GearType[]>("/gear-types"), APIService.fetchData<CustomGearType[]>("/custom-gear-types")]);
            setGearTypes(gearTypes);
            setCustomGearTypes(customGearTypes);
            setTimeout(() => setLoading(false), loadingSpinnerTime);
        };
        fetchData();
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

    const postGearItem = async (formData: NewGearItemFormState): Promise<number | null> => {
        try {
            const createdGearItem = await APIService.sendData<GearItem>("/gear-items", formData);
            return createdGearItem.id;
        } catch (error) {
            console.error("Error creating gear item:", error);
            return null;
        }
    };

    const postGearItemServiceInterval = async (gearItemId: number) => {
        try {
            const data = { ...newGearItemServiceState, gearItemId: gearItemId };
            await APIService.sendData("/gear-item-service-interval", data);
        } catch (error) {
            console.error("Error creating service interval:", error);
        }
    };

    const postGearItemService = async (gearItemId: number, serviceDate: string) => {
        try {
            const data = {
                gearItemId: gearItemId,
                serviceDate: serviceDate,
            };
            await APIService.sendData("/gear-item-service", data);
        } catch (error) {
            console.error("Error creating service record:", error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formIsValid = validateFormData(newGearItemFormState);
        if (!formIsValid) {
            return;
        }

        try {
            const createdGearItemId = await postGearItem(newGearItemFormState);

            if (trackService && createdGearItemId) {
                await postGearItemServiceInterval(createdGearItemId);

                const serviceDate = newGearItemServiceState.serviceDate;
                if (serviceDate && serviceDate !== "") {
                    await postGearItemService(createdGearItemId, serviceDate);
                }
            }
            navigate(`/gear/${createdGearItemId}`);
        } catch (error) {
            console.error("Error submitting gear item:", error);
            alert("Error submitting gear item");
        }
    };

    const validateFormData = (newGearItemFormState: NewGearItemFormState): boolean => {
        const gearTypes = [newGearItemFormState.customGearTypeId, newGearItemFormState.gearTypeId, newGearItemFormState.newCustomGearType];
        const onlyOne =
            (gearTypes.filter((item) => item === null).length === 1 && newGearItemFormState.newCustomGearType === "") ||
            (gearTypes.filter((item) => item === null).length === 2 && newGearItemFormState.newCustomGearType !== "");
        if (!onlyOne) {
            setGearTypeError(true);
        }
        return onlyOne;
    };

    const today = new Date().toISOString().split("T")[0];

    const handleTrackServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setTrackService(isChecked);
    };

    const handleGearTypeChange = (e: SelectChangeEvent<number>) => {
        const selectedGearType = e.target.value;
        const custom = e.target.name === "customGearType";
        let updatedNewGearItemFormState = null;

        if (custom) {
            updatedNewGearItemFormState = {
                ...newGearItemFormState,
                customGearTypeId: Number(selectedGearType),
                gearTypeId: null,
            };
        } else {
            updatedNewGearItemFormState = {
                ...newGearItemFormState,
                gearTypeId: Number(selectedGearType),
                customGearTypeId: null,
            };
        }

        setNewGearItemForm(updatedNewGearItemFormState);
        setGearTypeError(false);
        console.log("Selected gear type:", selectedGearType);
        console.log("New gear item form state:", updatedNewGearItemFormState);
    };

    const handleNewCustomGearTypeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedGearType = e.target.value;
        const updatedNewGearItemFormState = {
            ...newGearItemFormState,
            newCustomGearType: selectedGearType,
            gearTypeId: null,
            customGearTypeId: null,
        };
        setNewGearItemForm(updatedNewGearItemFormState);
        setGearTypeError(false);
        console.log("Selected gear type:", selectedGearType);
        console.log("New gear item form state:", updatedNewGearItemFormState);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedNewGearItemFormState = { ...newGearItemFormState, name: e.target.value };
        setNewGearItemForm(updatedNewGearItemFormState);
        setGearTypeError(false);
        console.log("New gear item form state:", updatedNewGearItemFormState);
    };

    const handleDateInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedNewGearItemServiceState = { ...newGearItemServiceState, [name]: value };
        setNewGearItemService(updatedNewGearItemServiceState);
        console.log("New gear item service state:", updatedNewGearItemServiceState);
    };

    const handleNumberInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = parseInt(e.target.value);
        const updatedNewGearItemServiceState = { ...newGearItemServiceState, [name]: value };
        setNewGearItemService(updatedNewGearItemServiceState);
        console.log("New gear item service state:", updatedNewGearItemServiceState);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Add Gear
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {gearTypeError && <Alert severity="error">Select 1 of gear type, custom gear type or add a new custom gear type.</Alert>}
                    <FormControl fullWidth>
                        <InputLabel id="gearType-label">Gear Type</InputLabel>
                        <Select
                            labelId="gearType-label"
                            id="gearType"
                            name="gearType"
                            value={newGearItemFormState.gearTypeId || ""}
                            label="Gear Type"
                            onChange={handleGearTypeChange}
                        >
                            <MenuItem value="">Select Gear Type</MenuItem>
                            {gearTypes.map((gearType) => (
                                <MenuItem key={gearType.id} value={gearType.id}>
                                    {gearType.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {customGearTypes.length > 0 && (
                        <FormControl fullWidth>
                            <InputLabel id="customGearType-label">Custom Gear Type</InputLabel>
                            <Select
                                labelId="customGearType-label"
                                id="customGearType"
                                name="customGearType"
                                value={newGearItemFormState.customGearTypeId || ""}
                                label="Custom Gear Type"
                                onChange={handleGearTypeChange}
                            >
                                <MenuItem value="">Select Custom Gear Type</MenuItem>
                                {customGearTypes.map((customGearType) => (
                                    <MenuItem key={customGearType.id} value={customGearType.id}>
                                        {customGearType.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <TextField
                        label="Add Custom Gear Type"
                        id="newCustomGearType"
                        name="newCustomGearType"
                        value={newGearItemFormState.newCustomGearType || ""}
                        onChange={handleNewCustomGearTypeInput}
                        fullWidth
                    />
                    <TextField label="Name" id="name" name="name" required value={newGearItemFormState.name} onChange={handleInput} fullWidth />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={trackService} onChange={handleTrackServiceChange} />} label="Track Service" />
                    </FormGroup>
                    {trackService && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" gutterBottom>
                                Service Tracking
                            </Typography>
                            <TextField
                                label="Purchase Date"
                                id="purchaseDate"
                                name="purchaseDate"
                                type="date"
                                required
                                inputProps={{ max: today }}
                                value={newGearItemServiceState.purchaseDate}
                                onChange={handleDateInputs}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Last Serviced (optional)"
                                id="serviceDate"
                                name="serviceDate"
                                type="date"
                                inputProps={{ max: today }}
                                value={newGearItemServiceState.serviceDate}
                                onChange={handleDateInputs}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Dives before next service"
                                id="diveInterval"
                                name="diveInterval"
                                type="number"
                                required
                                value={newGearItemServiceState.diveInterval}
                                onChange={handleNumberInputs}
                                fullWidth
                            />
                            <TextField
                                label="Days before next service"
                                id="dayInterval"
                                name="dayInterval"
                                type="number"
                                required
                                value={newGearItemServiceState.dayInterval}
                                onChange={handleNumberInputs}
                                fullWidth
                            />
                        </>
                    )}
                    <Button id="addGearBtn" type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Add Gear
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

// name
// gear_type or custom gear_type
// purchase_date
// last_serviced

export default AddGear;
