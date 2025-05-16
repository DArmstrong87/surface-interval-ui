import React, { useState, useEffect, useCallback } from "react";
import APIService from "../../api/APIService";
import { GearItem, GearItemServiceInterval } from "../../interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Divider, Alert } from "@mui/material";
import OctopusSpinner from "../../OctopusSpinner";

function GearItemDetail() {
    const navigate = useNavigate();
    const { gearItemId } = useParams();
    const [gearItem, setGearItem] = useState<GearItem | null>(null);
    const [gearItemServiceInterval, setGearItemServiceInterval] = useState<GearItemServiceInterval | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGearItemAndServiceInterval = useCallback(async () => {
        try {
            const gearItem = await APIService.fetchData<GearItem>(`/gear-items/${gearItemId}`);
            setGearItem(gearItem);
            try {
                const gearItemServiceInterval = await APIService.fetchData<GearItemServiceInterval>(
                    `/gear-item-service-intervals/${gearItemId}`,
                );
                setGearItemServiceInterval(gearItemServiceInterval);
            } catch (error) {
                console.error("Error fetching gear item service interval:", error);
                setGearItemServiceInterval(null);
            }
        } catch (error) {
            console.error("Error fetching gear item:", error);
            setGearItem(null);
            setGearItemServiceInterval(null);
        } finally {
            setIsLoading(false);
        }
    }, [gearItemId]);

    useEffect(() => {
        setIsLoading(true);
        fetchGearItemAndServiceInterval();
    }, [gearItemId, fetchGearItemAndServiceInterval]);

    const deleteGearItem = () => {
        if (window.confirm("Are you sure you want to delete this gear item?")) {
            APIService.deleteData(`/gear-items/${gearItemId}`)
                .then(() => {
                    navigate("/gear");
                })
                .catch((error) => console.warn("Error deleting gear item:", error));
        }
    };

    if (isLoading) {
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

    if (!gearItem) {
        return (
            <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
                <Alert severity="error">No gear item found.</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
                <Typography variant="h4" gutterBottom align="center">
                    Gear Item Detail
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {gearItem.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Type: {gearItem.gear_type?.name || gearItem.custom_gear_type?.name || "Unknown Type"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {gearItem.service_tracking && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Service Tracking
                        </Typography>
                        {gearItemServiceInterval ? (
                            <>
                                <Typography>Purchase Date: {gearItemServiceInterval.purchase_date}</Typography>
                                {gearItem.days_since_last_service > 0 ? (
                                    <Typography color="error">
                                        This item is overdue for service by {gearItem.days_since_last_service} days
                                    </Typography>
                                ) : (
                                    <Typography>Days until next service: {gearItem.due_for_service_days}</Typography>
                                )}
                                {gearItem.dives_since_last_service > 0 ? (
                                    <Typography color="error">
                                        This item is overdue for service by {gearItem.dives_since_last_service} dives
                                    </Typography>
                                ) : (
                                    <Typography>
                                        Dives until next service: {Math.abs(gearItem.due_for_service_dives)}
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <Alert severity="info">No service interval found for this item.</Alert>
                        )}
                    </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button variant="outlined" color="error" onClick={deleteGearItem}>
                        Delete
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default GearItemDetail;
