import { Button, Typography } from "@mui/material";

import { Box } from "@mui/material";

import { Modal } from "@mui/material";
import APIService from "../../../api/APIService";
import { GearItem } from "../../../interfaces";

interface RemoveServiceTrackingModalProps {
    isOpen: boolean;
    gearItem: GearItem;
    onClose: () => void;
    onSuccess: () => void;
}

const RemoveServiceTrackingModal: React.FC<RemoveServiceTrackingModalProps> = ({ isOpen, gearItem, onClose, onSuccess }) => {
    const removeServiceTracking = () => {
        console.log("Removing service tracking:", gearItem?.service_interval?.id);
        APIService.deleteData(`/gear-item-service-intervals/${gearItem?.service_interval?.id}`)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                console.warn("Error removing service tracking:", error);
            })
            .finally(() => {
                onClose();
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
                <Typography variant="h6" align="center">
                    Remove Service Tracking for this item?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={removeServiceTracking}>
                        Remove
                    </Button>
                    <Button variant="outlined" color="info" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default RemoveServiceTrackingModal;
