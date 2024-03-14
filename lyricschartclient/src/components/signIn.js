import Cookies from "js-cookie";
import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginFailure, loginRequest, loginSuccess } from '../actions/user';
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/user";
import { Alert, Stack } from "@mui/material";


const defaultTheme = createTheme();
const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        var emailValidationRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!data.get('email') || !data.get('email').match(emailValidationRegex)) {
            setError("Please enter valid email address.");
            return;
        }
        if (!data.get('password')) {
            setError("Password can not be blank");
            return;
        }
        const userLoginData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        dispatch(loginRequest());
        try {
            const loginResponse = await loginUser(userLoginData);
            if (loginResponse.token) {
                dispatch(loginSuccess(loginResponse));
                Cookies.set("token", loginResponse.token, { expires: 2 });
                navigate(`/topartist`);
                window.location.reload(false);
            } else {
                setError(loginResponse.message);
                return;
            }
        } catch (error) {
            setError(error.message);
            dispatch(loginFailure("Error occurred while logging in."));
            console.error("Login failed:", error.message);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="email"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {error && (
                            <Stack sx={{ width: "100%" }} spacing={2}>
                                <Alert severity="error">{error}</Alert>
                            </Stack>
                        )}
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;

// const mapStateToProps = (state) => {
//     return {
//         user: state.loggedUser.user,
//     };
// };

// const mapDispatchToProps = {
//     loginRequest,
//     loginSuccess,
//     loginFailure,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
