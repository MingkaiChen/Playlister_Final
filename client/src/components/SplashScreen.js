import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TourIcon from '@mui/icons-material/Tour';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import { useContext } from 'react';



export default function SplashScreen() {

    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();

    const handleLogin = (event) => {
        history.push("/login/");

    };

    const handleCreate = (event) => {
        history.push("/register/");

    };

    const handleGuest = (event) => {
        store.loginAsGuest();
    }

    return (
        <div id="splash-screen">
            <Typography variant="h1" component="div" gutterBottom>
                Welcome to Playlister!
            </Typography>
            <Typography variant="h3" component="div" gutterBottom>
                The best way to make playlists!
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
                Please login or create an account to get started!
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
            >
                Login
            </Button>
            
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<HowToRegIcon />}
                onClick={handleCreate}
            >
                Create Account
            </Button>

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<TourIcon />}
                onClick={handleGuest}
            >
                Continue as Guest
            </Button>

            <br />

            <div id="splash-screen-credit">
                <Typography variant="h6" component="div" gutterBottom>
                    Created by Mingkai Chen
                </Typography>

            </div> 

        </div>
    )
}