import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../../api/APIService";
import { GearType, CustomGearType, GearItem, GearSet } from "../../interfaces";
import { Box, Button, Checkbox, Divider, FormControlLabel, Paper, TextField, Typography, Grid } from "@mui/material";
import OctopusSpinner from "../../OctopusSpinner";
import { loadingSpinnerTime } from "../Constants";

interface NewGearSetFormState {
    name: string;
    weight: number;
    gearItemIds: number[];
}

const newGearSetInitial: NewGearSetFormState = {
    name: "",
    weight: 0,
    gearItemIds: [],
};

function AddOrEditGearSet() {
    const { gearSetId } = useParams();

    const navigate = useNavigate();
    const [gearTypes, setGearTypes] = useState<GearType[]>([]);
    const [customGearTypes, setCustomGearTypes] = useState<CustomGearType[]>([]);
    const [newGearSetForm, setNewGearSetForm] = useState<NewGearSetFormState>(newGearSetInitial);
    const [gearItems, setGearItems] = useState<GearItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            const [gearItemsData, gearTypesData, customGearTypesData] = await Promise.all([
                APIService.fetchData<GearItem[]>("/gear-items"),
                APIService.fetchData<GearType[]>("/gear-types"),
                APIService.fetchData<CustomGearType[]>("/custom-gear-types"),
            ]);
            setGearItems(gearItemsData);
            setGearTypes(gearTypesData);
            setCustomGearTypes(customGearTypesData);
            if (gearSetId) {
                APIService.fetchData<GearSet>(`/gear-sets/${gearSetId}`).then((gearSet) => {
                    const formData = {
                        name: gearSet.name,
                        weight: gearSet.weight,
                        gearItemIds: gearSet.gear_items.map((item: GearItem) => item.id),
                    };
                    setNewGearSetForm(formData);
                    setTimeout(() => setLoading(false), loadingSpinnerTime);
                });
            } else {
                setTimeout(() => setLoading(false), loadingSpinnerTime);
            }
        };
        fetchAll();
    }, [gearSetId]);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewGearSetForm({ ...newGearSetForm, [name]: value });
        console.log(name, value);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const gearItemId = parseInt(name.split("-")[1]);
        let gearItemIds = newGearSetForm.gearItemIds;
        if (checked) {
            gearItemIds.push(gearItemId);
        } else {
            gearItemIds = gearItemIds.filter((id) => id !== gearItemId);
        }
        setNewGearSetForm({ ...newGearSetForm, gearItemIds: gearItemIds });
        console.log(gearItemIds);
    };

    const handleSubmit = () => {
        const gearSet = {
            name: newGearSetForm.name,
            weight: newGearSetForm.weight,
            gearItemIds: newGearSetForm.gearItemIds,
        };

        if (gearSetId) {
            APIService.updateData(`/gear-sets/${gearSetId}`, gearSet)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            APIService.sendData("/gear-sets", gearSet)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        console.log("Gear set submitted");
        navigate("/gear");
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this gear set?")) {
            APIService.deleteData(`/gear-sets/${gearSetId}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
            navigate("/gear");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    {gearSetId ? "Edit" : "Add"} Gear Set
                </Typography>
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Gear Set Name"
                        id="gearSetName"
                        name="name"
                        value={newGearSetForm.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Weight"
                        id="gearSetWeight"
                        name="weight"
                        type="number"
                        value={newGearSetForm.weight}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Select Gear Items
                    </Typography>
                    <Grid container spacing={2}>
                        {gearTypes &&
                            gearTypes
                                .filter((gearType) => gearItems.some((item) => item.gear_type?.name === gearType.name))
                                .map((gearType) => (
                                    <Grid item xs={12} md={6} key={gearType.id}>
                                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                            {gearType.name}
                                        </Typography>
                                        {gearItems
                                            .filter((gearItem) => gearItem.gear_type?.name === gearType.name)
                                            .map((gearItem) => (
                                                <FormControlLabel
                                                    key={gearItem.id}
                                                    control={
                                                        <Checkbox
                                                            checked={newGearSetForm.gearItemIds.includes(gearItem.id)}
                                                            onChange={handleCheckboxChange}
                                                            name={`gearItem-${gearItem.id}`}
                                                        />
                                                    }
                                                    label={gearItem.name}
                                                />
                                            ))}
                                    </Grid>
                                ))}
                        {customGearTypes &&
                            customGearTypes
                                .filter((customGearType) =>
                                    gearItems.some((item) => item.custom_gear_type?.id === customGearType.id),
                                )
                                .map((customGearType) => (
                                    <Grid item xs={12} md={6} key={customGearType.id}>
                                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                            {customGearType.name}
                                        </Typography>
                                        {gearItems
                                            .filter((gearItem) => gearItem.custom_gear_type?.id === customGearType.id)
                                            .map((gearItem) => (
                                                <FormControlLabel
                                                    key={gearItem.id}
                                                    control={
                                                        <Checkbox
                                                            checked={newGearSetForm.gearItemIds.includes(gearItem.id)}
                                                            onChange={handleCheckboxChange}
                                                            name={`gearItem-${gearItem.id}`}
                                                        />
                                                    }
                                                    label={gearItem.name}
                                                />
                                            ))}
                                    </Grid>
                                ))}
                    </Grid>
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button id="addGearSetBtn" type="submit" variant="contained" color="primary">
                            {gearSetId ? "Save" : "Add"} Gear Set
                        </Button>
                        {gearSetId && (
                            <Button id="deleteGearSetBtn" variant="outlined" color="error" onClick={handleDelete}>
                                Delete Gear Set
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default AddOrEditGearSet;
