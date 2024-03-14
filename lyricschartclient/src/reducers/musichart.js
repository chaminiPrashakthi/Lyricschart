import { FETCH_LATEST_ALBUMS_FAILURE, FETCH_LATEST_ALBUMS_REQUEST, FETCH_LATEST_ALBUMS_SUCCESS, FETCH_LYRICS_FOR_ALBUM_FAILURE, FETCH_LYRICS_FOR_ALBUM_REQUEST, FETCH_LYRICS_FOR_ALBUM_SUCCESS, FETCH_TOP_ARTISTS_FAILURE, FETCH_TOP_ARTISTS_REQUEST, FETCH_TOP_ARTISTS_SUCCESS } from "../actions/musichart";

const initialState = {
  topArtists: [],
  albums: [],
  lyrics: [],
  loading: false,
  error: null,
};

const lyricsChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_ARTISTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        topArtists: action.payload,
        error: null,
      };
    case FETCH_TOP_ARTISTS_FAILURE:
      return {
        ...state,
        loading: false,
        topArtists: [],
        error: action.payload,
      };
    case FETCH_LATEST_ALBUMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LATEST_ALBUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        albums: action.payload,
        error: null,
      };
    case FETCH_LATEST_ALBUMS_FAILURE:
      return {
        ...state,
        loading: false,
        albums: [],
        error: action.payload,
      };
      case FETCH_LYRICS_FOR_ALBUM_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_LYRICS_FOR_ALBUM_SUCCESS:
        return {
          ...state,
          loading: false,
          lyrics: action.payload,
          error: null,
        };
      case FETCH_LYRICS_FOR_ALBUM_FAILURE:
        return {
          ...state,
          loading: false,
          lyrics: [],
          error: action.payload,
        };
    default:
      return state;
  }
};

export default lyricsChartReducer;
