import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { connect, useSelector } from 'react-redux';
import CardActionArea from '@mui/material/CardActionArea';
import { fetchLyricsForAlbumsRequest, fetchLyricsForAlbumsSuccess, fetchLyricsForAlbumsFailure } from '../actions/musichart';
import { fetchLyricsOfAlbums } from '../api/musichart';
import Lyrics from './lyrics';
import "../resources/App.css";
import { CardContent, Grid, IconButton, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

const Albums = ({ topArtists, albums, loading, fetchLyricsForAlbumsRequest, fetchLyricsForAlbumsSuccess, fetchLyricsForAlbumsFailure, navigate }) => {
  const [clickedCardId, setClickedCardId] = useState(null);
  const theme = useTheme();

  const location = useLocation();
  const artistName = location.state ? location.state.artistName : null;

  const handleCardClick = (cardId, albumName) => {
    setClickedCardId(cardId);
    fetchAndNavigateToLyricsPage(cardId, albumName);
  };

  const fetchAndNavigateToLyricsPage = (cardId, albumName) => {
    if (cardId !== null) {
      fetchLyricsForAlbumsRequest();
      fetchLyricsOfAlbums(cardId)
        .then((data) => {
          fetchLyricsForAlbumsSuccess(data);
          navigate(`/lyrics/${cardId}`, { state: { albumName } });
        })
        .catch((error) => {
          fetchLyricsForAlbumsFailure(error);
        });
    }
  };

  const currentUri = window.location.href;
  const text = `/lyrics/${clickedCardId}`;

  return (
    <div>
      <Typography variant='h4' align="center">Albums Of {artistName}</Typography>
      <div style={{ marginTop: '20px' }}>
        <CardActionArea component="a" href="#">
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Grid container spacing={1}>
              {albums.map((album) => (
                <Grid item key={album.album_id} xs={12} sm={6} md={3} lg={4}>

                  <Card id="cardsStyle" key={album.album_id} onClick={() => handleCardClick(album.album_id, album.album_name)} sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {album.album_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Album Rating :{album.album_rating}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Released Date : {album.album_release_date}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                          {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                          {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </CardActionArea>
      </div>
      {currentUri.includes(text) && <Lyrics albumId={clickedCardId} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.lyrics.loading,
    albums: state.lyrics.albums,
    topArtists: state.lyrics.topArtists,
    lyrics: state.lyrics.lyrics,
  };
};

const mapDispatchToProps = {
  fetchLyricsForAlbumsRequest,
  fetchLyricsForAlbumsSuccess,
  fetchLyricsForAlbumsFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
