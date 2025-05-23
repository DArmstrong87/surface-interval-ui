import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import APIService from "../../api/APIService";
import { Diver } from "../../interfaces";
import RandomSpinner from "../../RandomSpinner";
import { loadingSpinnerTime } from "../Constants";

import DiveStats from "../dives/DiveStats";

function Profile() {
    const [diver, setDiver] = useState<Diver>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [diver] = await Promise.all([APIService.fetchData<Diver>("/divers")]);
            setDiver(diver);
            setTimeout(() => setLoading(false), loadingSpinnerTime);
        };
        fetchData();
    }, []);

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
    );
}

export default Profile;
