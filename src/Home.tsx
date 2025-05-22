import SI_splash from "./images/SI_splash.png";
import "./App.css";
import { Box, Typography } from "@mui/material";

function Home() {
    return (
        <Box className="App">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="start"
                sx={{
                    backgroundImage: `url(${SI_splash})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                    padding: "20px",
                    height: "100vh",
                }}
            >
                <Box
                    sx={{
                        animation: "floatUp 2.2s cubic-bezier(0.22, 1, 0.36, 1) 1",
                        animationFillMode: "forwards",
                        "@keyframes floatUp": {
                            "0%": { transform: "translateY(0px)", opacity: 0 },
                            "80%": { opacity: 1 },
                            "100%": { transform: "translateY(-24px)", opacity: 1 },
                        },
                        textAlign: "left",
                        color: "white",
                        fontSize: "1.5rem",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        padding: "20px",
                        margin: "20px",
                        marginTop: "2em",
                        maxWidth: { lg: "60%", sm: "90%", xs: "90%" },
                        borderRadius: "10px",
                    }}
                >
                    <Typography variant="h4" style={{ textAlign: "center" }}>
                        Welcome to Surface Interval!
                    </Typography>
                    <Typography variant="h6" style={{ textAlign: "center", margin: "1rem" }}>
                        Plan // Dive // Log // Repeat
                    </Typography>
                    <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                        A surface interval is the time spend between dives for the purpose of reducing residual nitrogen, logging the previous dive and planning for the next one.
                    </Typography>

                    <Typography variant="h6">Surface Interval tracks your dives, gear and certifications, allowing you to access them from anywhere.</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;
