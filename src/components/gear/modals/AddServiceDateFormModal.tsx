import React, { useState } from "react";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import APIService from "../../../api/APIService";
import { todaysDate } from "../../../utils/timezone";

interface AddServiceDateFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    gearItemId: string;
    onSuccess: () => void;
}

const AddServiceDateFormModal: React.FC<AddServiceDateFormModalProps> = ({ isOpen, onClose, gearItemId, onSuccess }) => {
    const [serviceDate, setServiceDate] = useState("");

    const addServiceDate = (gearItemId: string) => {
        console.log("Adding service date:", serviceDate);
        const serviceDateData = {
            gearItemId: gearItemId,
            serviceDate: serviceDate,
        };
        APIService.sendData(`/gear-item-services`, serviceDateData)
            .then(() => {
                onSuccess();
            })
            .catch((error) => console.warn("Error adding service date:", error))
            .finally(() => {
                onClose();
                setServiceDate("");
            });
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ margin: { xs: "auto 2.5em auto 2.5rem" } }}>
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
                    Add Service Date
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <TextField
                        label="Service Date"
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: todaysDate }}
                    />
                    <Button variant="contained" color="primary" onClick={() => addServiceDate(gearItemId)}>
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddServiceDateFormModal;
