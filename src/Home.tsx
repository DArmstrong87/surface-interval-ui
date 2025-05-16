import SI_splash from "./images/SI_splash.png";
import "./App.css";
import { Box, Typography } from "@mui/material";

function Home() {
    return (
        <div className="App">
            <header className="App-header" style={{ backgroundColor: "white" }}>
                {/* <img src={SI_splash} alt="logo" style={{ maxWidth: "fit-content", margin: "0 auto" }} /> */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="start"
                    sx={{
                        backgroundImage: `url(${SI_splash})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "white",
                        padding: "20px",
                        height: "100vh",
                        width: "100vw",
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
                            marginTop: "40px",
                            maxWidth: "60%",
                            borderRadius: "10px",
                        }}
                    >
                        <Typography variant="h3" style={{ textAlign: "center" }}>
                            Welcome to Surface Interval!
                        </Typography>
                        <Typography variant="h5" style={{ textAlign: "center" }}>
                            Plan // Dive // Log // Repeat
                        </Typography>
                        <p />
                        A surface interval is the time spend between dives for the purpose of reducing residual
                        nitrogen, logging the previous dive and planning for the next one.
                        <p />
                        Surface Interval tracks your dives, gear and certifications, allowing you to access them from
                        anywhere.
                    </Box>
                </Box>
            </header>
        </div>
    );
}

export default Home;
