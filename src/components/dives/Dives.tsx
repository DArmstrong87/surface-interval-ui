import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import APIService from "../../api/APIService";
import { Dives } from "../../interfaces";
import OctopusSpinner from "../../OctopusSpinner";
import { loadingSpinnerTime } from "../Constants";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

function DiveLog() {
    const navigate = useNavigate();
    const [dives, setDives] = useState<Dives>([]);
    const [loading, setLoading] = useState(true);
    const rows: GridRowsProp = dives;
    const columns: GridColDef[] = [
        { field: "dive_number", headerName: "Number", width: 100, flex: 1, minWidth: 100 },
        { field: "date", headerName: "Date", width: 150, flex: 1, minWidth: 150 },
        { field: "location", headerName: "Location", width: 250, flex: 1, minWidth: 250 },
        {
            field: "site",
            headerName: "Site",
            type: "string",
            width: 250,
            flex: 1,
            minWidth: 250,
        },
        {
            field: "water",
            headerName: "Water",
            width: 100,
            flex: 1,
            minWidth: 100,
        },
        {
            field: "depth",
            headerName: "Depth",
            width: 100,
            flex: 1,
            minWidth: 100,
        },
        {
            field: "time",
            headerName: "Time",
            width: 100,
            flex: 1,
            minWidth: 100,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const [dives] = await Promise.all([APIService.fetchData<Dives>("/dives")]);
            setDives(dives);
            setTimeout(() => setLoading(false), loadingSpinnerTime);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <OctopusSpinner />
            </Box>
        );
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Dive Log
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("logDive")}>
                        Log Dive
                    </Button>
                </Box>

                <Paper sx={{ height: { lg: 800, md: 700, sm: 600, xs: 600 }, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 50,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}
                        sx={{
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: "primary.light",
                                color: "white",
                                fontWeight: "bold",
                            },
                        }}
                    />
                </Paper>
            </Container>
        </>
    );
}

export default DiveLog;
