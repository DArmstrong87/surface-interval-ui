import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Container, ThemeProvider, Typography, createTheme, CircularProgress } from '@mui/material';



function Splash() {
    const defaultTheme = createTheme();
    const [submitHidden, setSubmitHidden] = useState<boolean>(false)

    const handleSubmit = () => {
        setSubmitHidden(true)

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="xl" fixed sx={{ backgroundColor: "gray" }} >
                <Typography variant="h1" sx={{ color: "white" }}>Welcome to Surface Interval</Typography>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
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
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {!submitHidden &&
                            <Button
                                type="submit"
                                fullWidth
                                id='submitButton'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        }
                        {submitHidden &&
                            <Box width={1} sx={{ display: 'flex', justifyContent: "center" }}>
                                <CircularProgress />
                            </Box>
                        }
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
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Splash;
