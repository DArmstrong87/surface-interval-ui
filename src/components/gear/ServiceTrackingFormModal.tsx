import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { NewGearItemServiceInterval } from "../../interfaces";
import APIService from "../../api/APIService";

interface ServiceTrackingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    gearItemId: string;
    onSuccess: () => void;
}

const defaultNewServiceInterval: NewGearItemServiceInterval = {
    id: 0,
    gearItemId: 0,
    purchaseDate: "",
    lastServiceDate: null,
    diveInterval: 0,
    dayInterval: 0,
};

const ServiceTrackingFormModal: React.FC<ServiceTrackingFormModalProps> = ({
    isOpen,
    onClose,
    gearItemId,
    onSuccess,
}) => {
    const [newServiceInterval, setNewServiceInterval] = useState<NewGearItemServiceInterval>({
        ...defaultNewServiceInterval,
        gearItemId: parseInt(gearItemId || "0"),
    });
    const [formErrors, setFormErrors] = useState({
        purchaseDate: false,
        diveInterval: false,
        dayInterval: false,
    });

    const validateForm = () => {
        const errors = {
            purchaseDate: !newServiceInterval.purchaseDate,
            diveInterval: !newServiceInterval.diveInterval || newServiceInterval.diveInterval === 0,
            dayInterval: !newServiceInterval.dayInterval || newServiceInterval.dayInterval === 0,
        };
        setFormErrors(errors);
        return !Object.values(errors).some((error) => error);
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        APIService.sendData(`/gear-item-service-intervals`, newServiceInterval)
            .then(() => {
                if (newServiceInterval.lastServiceDate) {
                    APIService.sendData(`/gear-item-services`, {
                        gearItemId: gearItemId,
                        serviceDate: newServiceInterval.lastServiceDate,
                    });
                }
                onSuccess();
                handleClose();
            })
            .catch((error) => {
                console.warn("Error adding service tracking:", error);
            });
    };

    const handleClose = () => {
        setNewServiceInterval(defaultNewServiceInterval);
        setFormErrors({
            purchaseDate: false,
            diveInterval: false,
            dayInterval: false,
        });
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    p: 4,
                    maxWidth: 500,
                    width: "100%",
                    borderRadius: "10px",
                }}
            >
                <Typography variant="h4" align="center">
                    Add Service Tracking
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", mt: 2, gap: 2 }}>
                    <TextField
                        label="Purchase Date"
                        type="date"
                        value={newServiceInterval?.purchaseDate}
                        onChange={(e) => setNewServiceInterval({ ...newServiceInterval, purchaseDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        required
                        error={formErrors.purchaseDate}
                        helperText={formErrors.purchaseDate ? "Purchase date is required" : ""}
                    />
                    <TextField
                        label="Last Service Date"
                        type="date"
                        value={newServiceInterval?.lastServiceDate}
                        onChange={(e) =>
                            setNewServiceInterval({ ...newServiceInterval, lastServiceDate: e.target.value })
                        }
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Dive Interval"
                        type="number"
                        value={newServiceInterval?.diveInterval.toString().replace(/^0+(?=\d)/, "") || 0}
                        onChange={(e) =>
                            setNewServiceInterval({ ...newServiceInterval, diveInterval: parseInt(e.target.value) })
                        }
                        required
                        error={formErrors.diveInterval}
                        inputProps={{ min: 1 }}
                        helperText={formErrors.diveInterval ? "Dive interval must be greater than 0" : ""}
                    />
                    <TextField
                        label="Day Interval"
                        type="number"
                        value={newServiceInterval?.dayInterval.toString().replace(/^0+(?=\d)/, "") || 0}
                        onChange={(e) =>
                            setNewServiceInterval({ ...newServiceInterval, dayInterval: parseInt(e.target.value) })
                        }
                        required
                        error={formErrors.dayInterval}
                        inputProps={{ min: 1 }}
                        helperText={formErrors.dayInterval ? "Day interval must be greater than 0" : ""}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ServiceTrackingFormModal;
