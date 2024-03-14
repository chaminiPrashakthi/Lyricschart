import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000';
export const TOP_ARTISTS_CACHE_KEY = 'topArtistsCache';
export const ALBUMS_CACHE_KEY = 'albumsCache';
export const LYRICS_CACHE_KEY = 'LyricsCache';


const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;