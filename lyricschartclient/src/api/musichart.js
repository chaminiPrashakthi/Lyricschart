import api, { ALBUMS_CACHE_KEY, LYRICS_CACHE_KEY, TOP_ARTISTS_CACHE_KEY } from "../helpers/util";

export const fetchTopArtists = async (country) => {
  try {
    const cachedData = localStorage.getItem(TOP_ARTISTS_CACHE_KEY + country);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await api.get(`/topArtists/${country}`);
    const artistsData = response?.data?.artistsData?.map((item) => item.artist) ?? [];

    localStorage.setItem(TOP_ARTISTS_CACHE_KEY + country, JSON.stringify(artistsData));

    return artistsData;
  } catch (error) {
    console.error('Error fetching top artists:', error.message);
    throw new Error("Error fetching top artists:", error);
  }
};

export const fetchLatestAlbums = async (artistId) => {
  try {
    const cachedData = localStorage.getItem(ALBUMS_CACHE_KEY + artistId);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await api.get(`/albums/${artistId}`);
    const albums = response?.data?.albums?.map((item) => item.album) ?? [];

    localStorage.setItem(TOP_ARTISTS_CACHE_KEY + artistId, JSON.stringify(albums));

    return albums;
  } catch (error) {
    console.error('Error fetching latest three albums:', error.message);
    throw new Error("Error fetching latest three albums:", error);
  }
};

export const fetchLyricsOfAlbums = async (albumId) => {
  try {
    const cachedData = localStorage.getItem(LYRICS_CACHE_KEY + albumId);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await api.get(`/lyrics/${albumId}`);
    const lyrics = response?.data;

    localStorage.setItem(LYRICS_CACHE_KEY + albumId, JSON.stringify(lyrics));

    return lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error.message);
    throw new Error("Error fetching lyrics:", error);
  }
};