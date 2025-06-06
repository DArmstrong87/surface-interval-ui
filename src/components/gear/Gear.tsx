import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../api/APIService";
import { GearItem, GearSet } from "../../interfaces";
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Grid } from "@mui/material";
import RandomSpinner from "../../RandomSpinner";
import { loadingSpinnerTime } from "../Constants";
import ErrorNotification from "../common/ErrorNotification";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

function Gear() {
    const navigate = useNavigate();
    const [gearSets, setGearSets] = useState<GearSet[]>([]);
    const [gearItems, setGearItems] = useState<GearItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [APIerror, setAPIError] = useState<string | null>(null);
    const [showAPIError, setShowAPIError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gearSets, gearItems] = await Promise.all([APIService.fetchData<GearSet[]>("/gear-sets"), APIService.fetchData<GearItem[]>("/gear-items")]);
                setGearSets(gearSets);
                setGearItems(gearItems);
                setAPIError(null);
            } catch (err) {
                setAPIError("Failed to load gear. Please try again later.");
                setShowAPIError(true);
            } finally {
                setTimeout(() => setLoading(false), loadingSpinnerTime);
            }
        };
        fetchData();
    }, []);

    const handleCloseError = () => {
        setShowAPIError(false);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "75vh",
                    bgcolor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <RandomSpinner />
            </Box>
        );
    }

    function gearSetCards(gearSets: GearSet[]) {
        return (
            <Grid container spacing={2}>
                {gearSets.map((gearSet, index) => (
                    <Grid key={`${index}-gear-set-card`}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{ cursor: "pointer", mb: 1, ":hover": { color: "primary.main" } }}
                                onClick={() => navigate(`/gear/gear-set/${gearSet.id}`)}
                            >
                                {gearSet.name}
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell>Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gearSet.gear_items.map((gearItem, idx) => (
                                            <TableRow key={`${idx}-gear-item-table-row`} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/gear/${gearItem.id}`)}>
                                                <TableCell>{gearItem?.name}</TableCell>
                                                <TableCell>{gearItem?.gear_type?.name}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell>Weight: {gearSet.weight}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        );
    }

    function gearItemList(gearItems: GearItem[]) {
        return gearItems.map((gearItem, index) => (
            <TableRow key={`${index}-gear-items-table-row`} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/gear/${gearItem.id}`)}>
                <TableCell>{gearItem.name}</TableCell>
                <TableCell>{gearItem.gear_type?.name || gearItem.custom_gear_type?.name || "Unknown Type"}</TableCell>
            </TableRow>
        ));
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Gear
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate("./add")}>
                    Add Gear
                </Button>
                {gearItems.length > 0 && (
                    <Button variant="outlined" color="primary" onClick={() => navigate("./add-gear-set")}>
                        Add Gear Set
                    </Button>
                )}
            </Box>
            {gearSets.length > 0 && <Box sx={{ mb: 4 }}>{gearSetCards(gearSets)}</Box>}
            <Divider sx={{ my: 4 }} />
            {gearItems && gearItems.length > 0 ? (
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        All Gear Items
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{gearItemList(gearItems)}</TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <>
                    <Typography color="text.secondary" align="center">
                        No gear items created.
                    </Typography>
                    <Paper
                        elevation={4}
                        sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", p: 4, maxWidth: "80%", width: "100%", margin: "2rem auto" }}
                    >
                        <InfoOutlineIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                        <Typography variant="body1" gutterBottom>
                            Add your gear items using built-in or custom gear types. Then, add them to your gear set to track service dates and dive counts.
                        </Typography>
                    </Paper>
                </>
            )}
            <ErrorNotification open={showAPIError} message={APIerror} onClose={handleCloseError} />
        </Box>
    );
}

export default Gear;
