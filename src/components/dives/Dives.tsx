import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import APIService from "../../api/APIService";
import { Dive } from "../../interfaces";

function Dives() {
    const navigate = useNavigate();
    const [dives, setDives] = useState<Dive[]>([]);

    useEffect(() => {
        APIService.fetchData<Dive[]>("/dives").then((dives) => setDives(dives));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dive Log
                </Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("logDive")}>
                    Log Dive
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} aria-label="dive log table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell sx={{ color: "white" }}>Number</TableCell>
                            <TableCell sx={{ color: "white" }}>Date</TableCell>
                            <TableCell sx={{ color: "white" }}>Location</TableCell>
                            <TableCell sx={{ color: "white" }}>Site</TableCell>
                            <TableCell sx={{ color: "white" }}>Water</TableCell>
                            <TableCell sx={{ color: "white" }}>Depth</TableCell>
                            <TableCell sx={{ color: "white" }}>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dives.map((dive, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                                    "&:hover": { cursor: "pointer" },
                                }}
                                onClick={() => navigate(`/dives/${dive.id}`)}
                            >
                                <TableCell>{dive.dive_number}</TableCell>
                                <TableCell>{dive.date}</TableCell>
                                <TableCell>{dive.location}</TableCell>
                                <TableCell>{dive.site}</TableCell>
                                <TableCell>{dive.water}</TableCell>
                                <TableCell>{dive.depth}</TableCell>
                                <TableCell>{dive.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Dives;
