import { Box, Button, Modal, Typography } from "@mui/material";
import APIService from "../../../api/APIService";

interface DeleteGearItemModalProps {
    isOpen: boolean;
    gearItemId: string | undefined;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteGearItemModal: React.FC<DeleteGearItemModalProps> = ({ isOpen, gearItemId, onClose, onSuccess }) => {
    const deleteGearItem = () => {
        if (!gearItemId) {
            console.warn("Gear item ID is null");
            return;
        }
        console.log("Deleting gear item:", gearItemId);
        APIService.deleteData(`/gear-items/${gearItemId}`)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                console.warn("Error deleting gear item:", error);
            })
            .finally(() => {
                onClose();
            });
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
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
                    Delete this gear item?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={deleteGearItem}>
                        Delete
                    </Button>
                    <Button variant="outlined" color="info" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteGearItemModal;
