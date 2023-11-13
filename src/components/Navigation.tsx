import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
    const navigate = useNavigate();

    const navTo = (route: string) => {
        navigate(`/${route}`)

    }

    const logout = () => {
        if (window.location.pathname === "/") {
            localStorage.removeItem("si_token")
            window.location.reload()
        }
        else {
            localStorage.removeItem("si_token")
            navigate("/login");
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navTo("dives")}>
                            Dive Log
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navTo("dives")}>
                            Dive Plan
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navTo("dives")}>
                            Gear
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navTo("dives")}>
                            Profile
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}