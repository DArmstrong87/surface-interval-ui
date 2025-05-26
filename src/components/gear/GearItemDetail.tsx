import React, { useState, useEffect, useCallback } from "react";
import APIService from "../../api/APIService";
import { GearItem } from "../../interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Divider, Alert, List, ListItem, IconButton } from "@mui/material";
import RandomSpinner from "../../RandomSpinner";
import DeleteIcon from "@mui/icons-material/Delete";
import ServiceTrackingFormModal from "./modals/ServiceTrackingFormModal";
import AddServiceDateFormModal from "./modals/AddServiceDateFormModal";
import DeleteServiceDateModal from "./modals/DeleteServiceDateModal";
import RemoveServiceTrackingModal from "./modals/RemoveServiceTrackingModal";
import { getUserTimezone } from "../../utils/timezone";
import DeleteGearItemModal from "./modals/DeleteGearItemModal";

function GearItemDetail() {
    const navigate = useNavigate();
    const { gearItemId } = useParams();
    const [gearItem, setGearItem] = useState<GearItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddServiceDateModal, setShowAddServiceDateModal] = useState(false);
    const [showDeleteServiceDateModal, setShowDeleteServiceDateModal] = useState(false);
    const [serviceDateIdToDelete, setServiceDateIdToDelete] = useState<number | null>(null);
    const [showAddServiceTrackingModal, setShowAddServiceTrackingModal] = useState(false);
    const [showRemoveServiceTrackingModal, setShowRemoveServiceTrackingModal] = useState(false);
    const [showDeleteGearItemModal, setShowDeleteGearItemModal] = useState(false);

    const fetchGearItemAndServiceInterval = useCallback(async () => {
        try {
            setError(null);
            const timezone = getUserTimezone();
            const gearItem = await APIService.fetchData<GearItem>(`/gear-items/${gearItemId}?timezone=${encodeURIComponent(timezone)}`);
            if (!gearItem) {
                throw new Error("Gear item not found");
            }
            setGearItem(gearItem);
        } catch (error) {
            console.error("Error fetching gear item:", error);
            if (error instanceof Error) {
                if (error.message.includes("404")) {
                    setError("Gear item not found");
                    setGearItem(null);
                } else if (error.message.includes("401") || error.message.includes("403")) {
                    setError("Please log in to view this gear item");
                    navigate("/login");
                } else if (error.message.includes("500")) {
                    setError("Server error occurred. Please try again later.");
                    setGearItem(null);
                } else {
                    setError("An unexpected error occurred. Please try again.");
                    setGearItem(null);
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
                setGearItem(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, [gearItemId, navigate]);

    useEffect(() => {
        setIsLoading(true);
        fetchGearItemAndServiceInterval();
    }, [gearItemId, fetchGearItemAndServiceInterval]);

    const openAddServiceTrackingModal = () => {
        setShowAddServiceTrackingModal(true);
    };

    const closeAddServiceTrackingModal = () => {
        setShowAddServiceTrackingModal(false);
    };

    const openAddServiceDateModal = () => {
        setShowAddServiceDateModal(true);
    };

    const closeAddServiceDateModal = () => {
        setShowAddServiceDateModal(false);
    };

    const openDeleteServiceDateModal = (id: number) => {
        setServiceDateIdToDelete(id);
        setShowDeleteServiceDateModal(true);
    };

    const closeDeleteServiceDateModal = () => {
        setShowDeleteServiceDateModal(false);
        setServiceDateIdToDelete(null);
    };

    const openRemoveServiceTrackingModal = () => {
        setShowRemoveServiceTrackingModal(true);
    };

    const closeRemoveServiceTrackingModal = () => {
        setShowRemoveServiceTrackingModal(false);
    };

    const openDeleteGearItemModal = () => {
        setShowDeleteGearItemModal(true);
    };

    const closeDeleteGearItemModal = () => {
        setShowDeleteGearItemModal(false);
    };

    const navigateBackToGear = () => {
        navigate("/gear");
    };

    if (isLoading) {
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

    if (error) {
        return (
            <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
                <Alert severity="error">{error}</Alert>
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
        <>
            {/* FORM MODALS */}
            <ServiceTrackingFormModal
                isOpen={showAddServiceTrackingModal}
                onClose={closeAddServiceTrackingModal}
                gearItemId={gearItemId || ""}
                onSuccess={fetchGearItemAndServiceInterval}
            />
            <AddServiceDateFormModal
                isOpen={showAddServiceDateModal}
                onClose={closeAddServiceDateModal}
                gearItemId={gearItemId || ""}
                onSuccess={fetchGearItemAndServiceInterval}
            />
            <DeleteServiceDateModal
                isOpen={showDeleteServiceDateModal}
                onClose={closeDeleteServiceDateModal}
                serviceDateIdToDelete={serviceDateIdToDelete}
                onSuccess={fetchGearItemAndServiceInterval}
            />
            <RemoveServiceTrackingModal
                isOpen={showRemoveServiceTrackingModal}
                gearItem={gearItem}
                onClose={closeRemoveServiceTrackingModal}
                onSuccess={fetchGearItemAndServiceInterval}
            />
            <DeleteGearItemModal isOpen={showDeleteGearItemModal} gearItemId={gearItemId} onClose={closeDeleteGearItemModal} onSuccess={navigateBackToGear} />
            {/* END FORM MODALS */}

            {/* MAIN CONTENT */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    width: { xs: "300px", sm: "500px" },
                    margin: { xs: "2rem auto 0 auto", md: "2rem auto 0 auto" },
                }}
            >
                <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", width: "100%" }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Gear Item Detail
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {gearItem.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Type: {gearItem.gear_type?.name || gearItem.custom_gear_type?.name || "Unknown Type"}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Dive count: {gearItem.dive_count}
                    </Typography>

                    {/* Existing Service Tracking Section */}
                    <Divider sx={{ my: 2 }} />
                    {gearItem.service_tracking && (
                        <>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Service Tracking
                                </Typography>
                                {gearItem.service_interval ? (
                                    <>
                                        <Typography>Purchase Date: {gearItem.service_interval.purchase_date}</Typography>
                                        {gearItem.due_for_service_days > 0 ? (
                                            <Typography color="error">This item is overdue for service by {gearItem.due_for_service_days} days</Typography>
                                        ) : (
                                            <Typography>Days until next service: {Math.abs(gearItem.due_for_service_days)}</Typography>
                                        )}
                                        {gearItem.due_for_service_dives > 0 ? (
                                            <Typography color="error">This item is overdue for service by {gearItem.due_for_service_dives} dives</Typography>
                                        ) : (
                                            <Typography>Dives until next service: {Math.abs(gearItem.due_for_service_dives)}</Typography>
                                        )}
                                    </>
                                ) : (
                                    <Alert severity="info">No service interval found for this item.</Alert>
                                )}
                            </Box>

                            {/* Service History Section */}
                            <Typography variant="h6" gutterBottom>
                                Service History
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
                                <List sx={{ width: "100%" }} dense={true} disablePadding={true}>
                                    {gearItem.service_history.map((serviceHistory) => (
                                        <ListItem
                                            key={`${gearItemId}__${serviceHistory.id}`}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" onClick={() => openDeleteServiceDateModal(serviceHistory.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <Typography variant="body1">{serviceHistory.service_date}</Typography>
                                        </ListItem>
                                    ))}
                                    {gearItem.service_history.length === 0 && (
                                        <Typography variant="body1" color="text.secondary">
                                            No service history found for this item.
                                        </Typography>
                                    )}
                                </List>
                            </Box>
                            <Box sx={{ display: "flex-v", justifyContent: "flex-start", mt: 2 }}>
                                <Button variant="outlined" color="primary" onClick={openAddServiceDateModal}>
                                    Add Service Date
                                </Button>
                            </Box>
                            {/* END Service History Section */}
                        </>
                    )}
                    {/* END Service Tracking Section */}

                    {/* Add Service Tracking Section */}
                    {!gearItem.service_tracking && (
                        <>
                            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
                                <Button variant="outlined" color="primary" onClick={openAddServiceTrackingModal}>
                                    Add Service Tracking
                                </Button>
                            </Box>
                        </>
                    )}

                    {/* END Add Service Tracking Section */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button variant="outlined" color="error" onClick={openDeleteGearItemModal}>
                            Delete
                        </Button>
                    </Box>

                    {gearItem.service_tracking && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                            <Button variant="outlined" color="error" onClick={openRemoveServiceTrackingModal}>
                                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                                    Remove Service Tracking
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box>
            {/* END MAIN CONTENT */}
        </>
    );
}

export default GearItemDetail;
