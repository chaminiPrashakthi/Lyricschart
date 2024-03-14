import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { fetchCountries } from '../api/user';
import { userRegisterRequest, userRegisterSuccess, userRegisterFailure } from '../actions/user';
import { registerNewUser } from '../api/user';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';


const defaultTheme = createTheme();

export default function SignUp() {
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get('email'),
      password: data.get('password'),
      country: data.get('country'),
      phone: data.get('phone'),
    };


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
    if (!data.get('country')) {
      setError("Please select a country");
      return;
    }
    var phoneValidationRegex =
      /^(\d{10})$/;
    if (!data.get('phone') || !data.get('phone').match(phoneValidationRegex)) {
      setError("Please enter a valid phone number");
      return;
    }

    dispatch(userRegisterRequest());
    try {
      const userResisterResponse = await registerNewUser(userData);
      if (userResisterResponse.token) {
        dispatch(userRegisterSuccess(userResisterResponse));
        Cookies.set("token", userResisterResponse.token, { expires: 2 });
        navigate(`/topartist`);
        window.location.reload(false);
      } else {
        setError(userResisterResponse);
        return;
      }
    } catch (error) {
      setError("network Error");
      dispatch(userRegisterFailure('Error registering user. Please try again.'));
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
            Sign Up
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              autoComplete="tel"
            />
            <TextField
              select
              margin="normal"
              required
              fullWidth
              label="Country"
              name="country"
              SelectProps={{
                native: true,
              }}
            >
              {countries.map((country) => (
                <option key={country.name.common} value={country.cca2}>
                  {country.name.common}
                </option>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {error && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{error}</Alert>
              </Stack>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
