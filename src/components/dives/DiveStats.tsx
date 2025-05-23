import React from "react";
import { Paper, Box, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Grid, Divider } from "@mui/material";
import { DiverProfileProps } from "../../interfaces";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import ScubaDivingIcon from "@mui/icons-material/ScubaDiving";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import AirIcon from "@mui/icons-material/Air";
import ShortTextIcon from "@mui/icons-material/ShortText";

const tableCellStyle = { borderRight: "1px solid #ccc" };
const iconStyle = { marginRight: "1rem", color: "orange" };

const DiveStats: React.FC<DiverProfileProps> = ({ diver }) => {
    return (
        <>
            {diver && (
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <TableContainer component={Paper} sx={{ maxWidth: "400px", flex: 1, justifyContent: "center" }}>
                        <Table sx={{ maxWidth: "400px", flex: 1, justifyContent: "center" }}>
                            <TableHead sx={{ backgroundColor: "primary.light" }}>
                                <TableRow>
                                    <TableCell align="center" colSpan={2} sx={{ color: "white" }}>
                                        <h2>
                                            <AlignHorizontalLeftIcon sx={iconStyle}></AlignHorizontalLeftIcon>
                                            Dive Stats
                                        </h2>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <ScubaDivingIcon sx={iconStyle}></ScubaDivingIcon>
                                        Total Dives
                                    </TableCell>
                                    <TableCell>{diver.total_dives}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <CalendarMonthIcon sx={iconStyle}></CalendarMonthIcon>
                                        Most Recent
                                    </TableCell>
                                    <TableCell>{diver.most_recent_dive}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <KeyboardDoubleArrowDownIcon sx={iconStyle}></KeyboardDoubleArrowDownIcon>
                                        Deepest
                                    </TableCell>
                                    <TableCell>{diver.deepest_dive}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <LineAxisIcon sx={iconStyle}></LineAxisIcon>
                                        Longest
                                    </TableCell>
                                    <TableCell>{diver.longest_dive}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <ShortTextIcon sx={iconStyle}></ShortTextIcon>
                                        Shortest
                                    </TableCell>
                                    <TableCell>{diver.shortest_dive}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <DirectionsBoatIcon sx={iconStyle}></DirectionsBoatIcon>
                                        Most logged specialty
                                    </TableCell>
                                    <TableCell>
                                        <Grid container flex={1} flexDirection={"column"}>
                                            <Grid>{diver.most_logged_specialty.specialty_name}</Grid>
                                            <Grid> Count: {diver.most_logged_specialty.count}</Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        <AirIcon sx={iconStyle}></AirIcon>
                                        Air Consumption
                                    </TableCell>
                                    {diver.air_consumption && (
                                        <TableCell>
                                            <Grid container flex={1} flexDirection={"column"}>
                                                <Grid> Average</Grid>
                                                <Grid> cuFt/min: {diver.air_consumption.average.cu_ft_min}</Grid>
                                                <Grid> ltrs/min: {diver.air_consumption.average.ltrs_min}</Grid>
                                            </Grid>
                                            <Divider sx={{ margin: "1rem 0 1rem 0" }} />
                                            <Grid container flex={1} flexDirection={"column"}>
                                                <Grid> Most Efficient</Grid>
                                                <Grid> cuFt/min: {diver.air_consumption.most_efficient.cu_ft_min}</Grid>
                                                <Grid> ltrs/min: {diver.air_consumption.most_efficient.ltrs_min}</Grid>
                                            </Grid>
                                            <Divider sx={{ margin: "1rem 0 1rem 0" }} />
                                            <Grid container flex={1} flexDirection={"column"}>
                                                <Grid> Least Efficient</Grid>
                                                <Grid> cuFt/min: {diver.air_consumption.least_efficient.cu_ft_min}</Grid>
                                                <Grid> ltrs/min: {diver.air_consumption.least_efficient.ltrs_min}</Grid>
                                            </Grid>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
};

export default DiveStats;
