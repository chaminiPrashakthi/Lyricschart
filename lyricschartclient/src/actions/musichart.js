export const FETCH_TOP_ARTISTS_REQUEST = 'FETCH_TOP_ARTISTS_REQUEST';
export const FETCH_TOP_ARTISTS_SUCCESS = 'FETCH_TOP_ARTISTS_SUCCESS';
export const FETCH_TOP_ARTISTS_FAILURE = 'FETCH_TOP_ARTISTS_FAILURE';

export const FETCH_LATEST_ALBUMS_REQUEST = 'FETCH_LATEST_ALBUMS_REQUEST';
export const FETCH_LATEST_ALBUMS_SUCCESS = 'FETCH_LATEST_ALBUMS_SUCCESS';
export const FETCH_LATEST_ALBUMS_FAILURE = 'FETCH_LATEST_ALBUMS_FAILURE';

export const FETCH_LYRICS_FOR_ALBUM_REQUEST = 'FETCH_LYRICS_FOR_ALBUM_REQUEST';
export const FETCH_LYRICS_FOR_ALBUM_SUCCESS = 'FETCH_LYRICS_FOR_ALBUM_SUCCESS';
export const FETCH_LYRICS_FOR_ALBUM_FAILURE = 'FETCH_LYRICS_FOR_ALBUM_FAILURE';

export const fetchTopArtistsRequest = () => ({
  type: FETCH_TOP_ARTISTS_REQUEST,
});

export const fetchTopArtistsSuccess = (topArtists) => ({
  type: FETCH_TOP_ARTISTS_SUCCESS,
  payload: topArtists,
});
export const fetchTopArtistsFailure = (error) => ({
  type: FETCH_TOP_ARTISTS_FAILURE,
  payload: error,
});

export const fetchLatestAlbumsRequest = () => ({
  type: FETCH_LATEST_ALBUMS_REQUEST,
});

export const fetchLatestAlbumsSuccess = (albums) => ({
  type: FETCH_LATEST_ALBUMS_SUCCESS,
  payload: albums,
});
export const fetchLatestAlbumsFailure = (error) => ({
  type: FETCH_LATEST_ALBUMS_FAILURE,
  payload: error,
});

export const fetchLyricsForAlbumsRequest = () => ({
  type: FETCH_LYRICS_FOR_ALBUM_REQUEST,
});

export const fetchLyricsForAlbumsSuccess = (lyrics) => ({
  type: FETCH_LYRICS_FOR_ALBUM_SUCCESS,
  payload: lyrics,
});
export const fetchLyricsForAlbumsFailure = (error) => ({
  type: FETCH_LYRICS_FOR_ALBUM_FAILURE,
  payload: error,
});