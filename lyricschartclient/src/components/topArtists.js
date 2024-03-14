import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchTopArtistsRequest, fetchTopArtistsSuccess, fetchTopArtistsFailure, fetchLatestAlbumsRequest, fetchLatestAlbumsSuccess, fetchLatestAlbumsFailure } from '../actions/musichart';
import { fetchLatestAlbums, fetchTopArtists } from '../api/musichart';
import Grid from '@mui/material/Grid';
import Card from "react-bootstrap/Card";
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Albums from './albums';
import "../resources/App.css";
import { useNavigate } from 'react-router-dom';
import { Alert, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const TopArtists = ({ topArtists, loading, error, fetchTopArtistsRequest, fetchTopArtistsSuccess, fetchTopArtistsFailure, fetchLatestAlbumsRequest, fetchLatestAlbumsSuccess, fetchLatestAlbumsFailure }) => {
    const [clickedCardId, setClickedCardId] = useState(null);
    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            fetchTopArtistsRequest();
            const code = await getUSerCountryCode();
            setCountryCode(code);
            fetchTopArtists(code)
                .then((data) => fetchTopArtistsSuccess(data))
                .catch((error) => fetchTopArtistsFailure(error));
        };

        fetchData();
    }, [fetchTopArtistsRequest, fetchTopArtistsSuccess, fetchTopArtistsFailure]);



    const getUSerCountryCode = async () => {
        const token = Cookies.get("token");
        if (token) {
            const decodedToken = await jwtDecode(token);
            return decodedToken.user_country;
        }
        return null;
    }

    const handleCardClick = (cardId, artistName) => {
        setClickedCardId(cardId);
        fetchAndNavigateToAlbumsPage(cardId, artistName);
    };

    const fetchAndNavigateToAlbumsPage = (artistId, artistName) => {
        if (artistId !== null) {
            fetchLatestAlbumsRequest();
            fetchLatestAlbums(artistId)
                .then((data) => {
                    fetchLatestAlbumsSuccess(data);
                    navigateToAlbumsPage(artistId, artistName);
                })
                .catch((error) => {
                    fetchLatestAlbumsFailure(error);
                });
        }
    };

    const navigateToAlbumsPage = (artistId, artistName) => {
        navigate(`/album/${artistId}`, { state: { artistName } });
    };

    const currentUri = window.location.href;
    const text = `/album/${clickedCardId}`;
    return (
        <div>
            {loading && <CircularProgress sx={{ alignSelf: 'center', mt: 4 }} />}
            {error && (
                <Alert variant="outlined" severity="error">
                    Showing Top Artists Error, Please try again later !!!.
                </Alert>
            )}
            {!loading && !error && (
                <>
                    <Typography variant='h4' align="center">Top Artists - {countryCode}</Typography>
                    <div style={{ marginTop: '20px' }}>
                        <CardActionArea component="a" href="#">
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Grid container spacing={1}>
                                    {topArtists.map((artist) => (
                                        <Grid item key={artist.artist_id} xs={12} sm={6} md={3} lg={4}>
                                            <Card id="cardsStyle" onClick={() => handleCardClick(artist.artist_id, artist.artist_name)}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5">
                                                            {artist.artist_name}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                            </Box>
                        </CardActionArea>
                    </div>

                    {currentUri.includes(text) && <Albums />}
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        topArtists: state.lyrics.topArtists,
        loading: state.lyrics.loading,
        albums: state.lyrics.albums,
        error: state.lyrics.error,
    };
};

const mapDispatchToProps = {
    fetchTopArtistsRequest,
    fetchTopArtistsSuccess,
    fetchTopArtistsFailure,
    fetchLatestAlbumsRequest,
    fetchLatestAlbumsSuccess,
    fetchLatestAlbumsFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopArtists);
