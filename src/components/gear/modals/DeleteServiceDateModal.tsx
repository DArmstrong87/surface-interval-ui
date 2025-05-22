import { Button, Typography } from "@mui/material";

import { Box } from "@mui/material";

import { Modal } from "@mui/material";
import APIService from "../../../api/APIService";

interface DeleteServiceDateModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceDateIdToDelete: number | null;
    onSuccess: () => void;
}

const DeleteServiceDateModal: React.FC<DeleteServiceDateModalProps> = ({ isOpen, onClose, serviceDateIdToDelete, onSuccess }) => {
    const deleteServiceDate = (serviceDateIdToDelete: number | null) => {
        if (!serviceDateIdToDelete) {
            console.error("No service date ID to delete");
            return;
        }
        console.log("Deleting service date:", serviceDateIdToDelete);
        APIService.deleteData(`/gear-item-services/${serviceDateIdToDelete}`)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                console.warn("Error deleting service date:", error);
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
                    Delete Service Date for this item?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => deleteServiceDate(serviceDateIdToDelete)}>
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

export default DeleteServiceDateModal;
