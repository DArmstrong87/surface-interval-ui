import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import APIService from "../../api/APIService";
import { Diver } from "../../interfaces";
import RandomSpinner from "../../RandomSpinner";
import { loadingSpinnerTime } from "../Constants";
import ErrorNotification from "../common/ErrorNotification";

import DiveStats from "../dives/DiveStats";

function Profile() {
    const [diver, setDiver] = useState<Diver>();
    const [loading, setLoading] = useState(true);
    const [APIerror, setAPIError] = useState<string | null>(null);
    const [showAPIError, setShowAPIError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [diver] = await Promise.all([APIService.fetchData<Diver>("/divers")]);
                setDiver(diver);
                setTimeout(() => setLoading(false), loadingSpinnerTime);
            } catch (err) {
                setAPIError("Failed to load profile. Please try again later.");
                setShowAPIError(true);
            } finally {
                setTimeout(() => setLoading(false), loadingSpinnerTime);
            }
        };
        fetchData();
    }, []);

    const handleCloseError = () => {
        setShowAPIError(false);
    };

    if (loading) {
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

    return (
        <>
            {APIerror ? (
                <>
                    <ErrorNotification open={showAPIError} message={APIerror} onClose={handleCloseError} />
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
                        Something went wrong. Please try again later.
                    </Box>
                </>
            ) : (
                <>
                    <Container maxWidth="lg" sx={{ py: 4 }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Profile
                            </Typography>
                        </Box>
                    </Container>
                    <Container sx={{ flex: 1, justifyContent: "center", marginBottom: "1rem" }}>
                        <DiveStats diver={diver}></DiveStats>
                    </Container>
                </>
            )}
        </>
    );
}

export default Profile;
