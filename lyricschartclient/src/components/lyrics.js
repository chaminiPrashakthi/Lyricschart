import React from "react";
import CardActionArea from '@mui/material/CardActionArea';
import { CardContent, Typography } from '@mui/material';
import Card from "react-bootstrap/Card";
import "../resources/App.css";
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';


const Lyrics = ({ lyrics, loading }) => {

    const location = useLocation();
    const albumName = location.state ? location.state.albumName : null;


    const trackLyricsMap = new Map();
    lyrics.forEach((item) => {
        const trackName = item.track.track_name;
        const lyricsBody = item?.lyrics?.lyrics_body;

        if (trackName) {
            trackLyricsMap.set(trackName, lyricsBody);
        }

    });

    return (
        <div>

            <Typography variant='h4' align="center">Lyrics Of {albumName}'s Tracks </Typography>
            <div style={{ marginTop: '20px' }}>
                <CardActionArea component="a" href="#">
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                        {Array.from(trackLyricsMap.entries()).map(([trackName, lyricsBody]) => (
                            <Card id="cardsStyle" key={trackName} sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {trackName}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {lyricsBody?.includes('*******')
                                                ? lyricsBody.substring(0, lyricsBody.indexOf('*******'))
                                                : lyricsBody || '-'}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        ))}
                    </div>
                </CardActionArea>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.lyrics.loading,
        lyrics: state.lyrics.lyrics,
    };
};

export default connect(mapStateToProps)(Lyrics);