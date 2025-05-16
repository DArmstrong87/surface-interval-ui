import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../api/APIService";
import { GearItem, GearSet } from "../../interfaces";
import {
    Box,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
    Grid,
} from "@mui/material";

function Gear() {
    const navigate = useNavigate();
    const [gearSets, setGearSets] = useState<GearSet[]>([]);
    const [gearItems, setGearItems] = useState<GearItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [gearSets, gearItems] = await Promise.all([
                APIService.fetchData<GearSet[]>("/gear-sets"),
                APIService.fetchData<GearItem[]>("/gear-items"),
            ]);
            setGearSets(gearSets);
            setGearItems(gearItems);
        };
        fetchData();
    }, []);

    function gearSetCards(gearSets: GearSet[]) {
        return (
            <Grid container spacing={2}>
                {gearSets.map((gearSet, index) => (
                    <Grid item xs={12} md={6} key={`${index}-gear-set-card`}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{ cursor: "pointer", mb: 1, ":hover": { color: "primary.main" } }}
                                onClick={() => navigate(`/gear/gear-set/${gearSet.id}`)}
                            >
                                {gearSet.name}
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell>Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gearSet.gear_items.map((gearItem, idx) => (
                                            <TableRow
                                                key={`${idx}-gear-item-table-row`}
                                                hover
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => navigate(`/gear/${gearItem.id}`)}
                                            >
                                                <TableCell>{gearItem?.name}</TableCell>
                                                <TableCell>{gearItem?.gear_type?.name}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell>Weight: {gearSet.weight}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        );
    }

    function gearItemList(gearItems: GearItem[]) {
        return gearItems.map((gearItem, index) => (
            <TableRow
                key={`${index}-gear-items-table-row`}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/gear/${gearItem.id}`)}
            >
                <TableCell>{gearItem.name}</TableCell>
                <TableCell>{gearItem.gear_type?.name || gearItem.custom_gear_type?.name || "Unknown Type"}</TableCell>
            </TableRow>
        ));
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Gear
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate("./add")}>
                    Add Gear
                </Button>
                {gearItems.length > 0 && (
                    <Button variant="outlined" color="primary" onClick={() => navigate("./add-gear-set")}>
                        Add Gear Set
                    </Button>
                )}
            </Box>
            {gearSets.length > 0 && <Box sx={{ mb: 4 }}>{gearSetCards(gearSets)}</Box>}
            <Divider sx={{ my: 4 }} />
            {gearItems && gearItems.length > 0 ? (
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        All Gear Items
                    </Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{gearItemList(gearItems)}</TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <Typography color="text.secondary" align="center">
                    No gear items created.
                </Typography>
            )}
        </Box>
    );
}

export default Gear;
