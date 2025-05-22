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
            <AppBar position="static">
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "start",
                        gap: 1,
                        px: 2,
                    }}
                >
                    {/* Logo + Title Row */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexDirection: "row",
                        }}
                    >
                        <img
                            src={dive_flag}
                            alt="logo"
                            style={{
                                maxWidth: "60px",
                                maxHeight: "60px",
                                objectFit: "contain",
                            }}
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            Surface Interval
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            gap: 1,
                            mt: { xs: 1, sm: 0 },
                        }}
                    >
                        {[
                            { label: "Dive Log", path: "dives" },
                            { label: "Dive Plan", path: "dive-planner" },
                            { label: "Gear", path: "gear" },
                            { label: "Profile", path: "" },
                            { label: "Logout", action: logout },
                        ].map(({ label, path, action }) => (
                            <Typography
                                key={label}
                                variant="body1"
                                sx={{
                                    cursor: "pointer",
                                    color: "white",
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1,
                                    textAlign: "center",
                                    ":hover": {
                                        color: "orange",
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                    },
                                }}
                                onClick={() => (action ? action() : navTo(path))}
                            >
                                {label}
                            </Typography>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}
