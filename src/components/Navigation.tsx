import dive_flag from "../images/dive_flag.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
export default function ButtonAppBar() {
    const navigate = useNavigate();

    const navTo = (route: string) => {
        navigate(`/${route}`);
    };

    const logout = () => {
        if (window.location.pathname === "/") {
            localStorage.removeItem("si_token");
            window.location.reload();
        } else {
            localStorage.removeItem("si_token");
            navigate("/login");
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Box
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "100px" }}
                        >
                            <img
                                src={dive_flag}
                                alt="logo"
                                style={{
                                    maxWidth: "60px",
                                    maxHeight: "60px",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                gap: 3,
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    ":hover": {
                                        color: "orange",
                                        // background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.5s",
                                    },
                                }}
                                onClick={() => navTo("")}
                            >
                                Surface Interval
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    ":hover": {
                                        color: "orange",
                                        background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.3s",
                                    },
                                }}
                                onClick={() => navTo("dives")}
                            >
                                Dive Log
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    ":hover": {
                                        color: "orange",
                                        background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.3s",
                                    },
                                }}
                                onClick={() => navTo("dive-planner")}
                            >
                                Dive Plan
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    ":hover": {
                                        color: "orange",
                                        background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.3s",
                                    },
                                }}
                                onClick={() => navTo("gear")}
                            >
                                Gear
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    ":hover": {
                                        color: "orange",
                                        background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.3s",
                                    },
                                }}
                                onClick={() => navTo("")}
                            >
                                Profile
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    ":hover": {
                                        color: "orange",
                                        background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.3s",
                                    },
                                }}
                                onClick={logout}
                            >
                                Logout
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
