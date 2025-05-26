import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorNotificationProps {
    open: boolean;
    message: string | null;
    onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ open, message, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorNotification;
