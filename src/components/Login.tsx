import { useState } from "react";
import { TextField, FormControlLabel, Checkbox, Link, Grid, Box, Button, Container, ThemeProvider, Typography, createTheme, CircularProgress, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../interfaces";
import { BASE_URL } from "../api/APIService";

function Login() {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const [submitHidden, setSubmitHidden] = useState<boolean>(false);
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitHidden(true);
        const axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        axiosInstance.post(`login`, loginForm).then((res) => {
            localStorage.setItem("si_token", res.data.token);
            navigate("/");
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="sm">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                            Welcome to Surface Interval
                        </Typography>
                        <Typography component="h1" variant="h6" align="center" sx={{ mb: 2 }}>
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={loginForm.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={loginForm.password}
                                onChange={handleInputChange}
                            />
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} id="Remember me" name="Remember me" label="Remember me" />
                            {!submitHidden && (
                                <Button type="submit" fullWidth id="submitButton" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Sign In
                                </Button>
                            )}
                            {submitHidden && (
                                <Box width={1} sx={{ display: "flex", justifyContent: "center" }}>
                                    <CircularProgress />
                                </Box>
                            )}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Login;
