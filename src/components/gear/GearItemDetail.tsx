import React, { useState, useEffect, useCallback } from "react";
import APIService from "../../api/APIService";
import { GearItem } from "../../interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Divider, Alert, List, ListItem, IconButton } from "@mui/material";
import OctopusSpinner from "../../OctopusSpinner";
import DeleteIcon from "@mui/icons-material/Delete";
import ServiceTrackingFormModal from "./ServiceTrackingFormModal";
import AddServiceDateFormModal from "./AddServiceDateFormModal";
import DeleteServiceDateModal from "./DeleteServiceDateModal";
import RemoveServiceTrackingModal from "./RemoveServiceTrackingModal";
import { getUserTimezone } from "../../utils/timezone";

function GearItemDetail() {
    const navigate = useNavigate();
    const { gearItemId } = useParams();
    const [gearItem, setGearItem] = useState<GearItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddServiceDateModal, setShowAddServiceDateModal] = useState(false);
    const [showDeleteServiceDateModal, setShowDeleteServiceDateModal] = useState(false);
    const [serviceDateIdToDelete, setServiceDateIdToDelete] = useState<number | null>(null);
    const [showAddServiceTrackingModal, setShowAddServiceTrackingModal] = useState(false);
    const [showRemoveServiceTrackingModal, setShowRemoveServiceTrackingModal] = useState(false);

    const fetchGearItemAndServiceInterval = useCallback(async () => {
        try {
            const timezone = getUserTimezone();
            const gearItem = await APIService.fetchData<GearItem>(`/gear-items/${gearItemId}?timezone=${timezone}`);
            setGearItem(gearItem);
        } catch (error) {
            console.error("Error fetching gear item:", error);
            setGearItem(null);
        } finally {
            setIsLoading(false);
        }
        setIsLoading(false);
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
                <OctopusSpinner />
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
            {/* END FORM MODALS */}

            {/* MAIN CONTENT */}
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
                                        {gearItem.days_since_last_service > 0 ? (
                                            <Typography color="error">This item is overdue for service by {gearItem.days_since_last_service} days</Typography>
                                        ) : (
                                            <Typography>Days until next service: {Math.abs(gearItem.due_for_service_days)}</Typography>
                                        )}
                                        {gearItem.dives_since_last_service > 0 ? (
                                            <Typography color="error">This item is overdue for service by {gearItem.dives_since_last_service} dives</Typography>
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
                        <Button variant="outlined" color="error" onClick={deleteGearItem}>
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
