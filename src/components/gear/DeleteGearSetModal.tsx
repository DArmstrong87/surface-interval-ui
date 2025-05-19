import { Button, Typography } from "@mui/material";

import { Box } from "@mui/material";

import { Modal } from "@mui/material";
import APIService from "../../api/APIService";

interface DeleteGearSetModalProps {
    isOpen: boolean;
    gearSetId: string | undefined;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteGearSetModal: React.FC<DeleteGearSetModalProps> = ({ isOpen, gearSetId, onClose, onSuccess }) => {
    const deleteGearSet = () => {
        console.log("Deleting gear set:", gearSetId);
        APIService.deleteData(`/gear-sets/${gearSetId}`)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                console.warn("Error deleting gear set:", error);
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
                    Delete this gear set?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={deleteGearSet}>
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

export default DeleteGearSetModal;
