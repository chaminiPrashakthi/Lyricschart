import React from 'react';
import Cookies from "js-cookie";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TopArtistsWrapper from './components/topArtistsWrapper';
import AlbumsWrapper from './components/albumsWrapper';
import Lyrics from './components/lyrics';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import NavBar from './components/navBar';


function App() {

  function checkJWT() {
    let flag = false;
    //check user has JWT token
    Cookies.get("token") ? (flag = true) : (flag = false);
    if (flag === true) {
      const jwtPayload = JSON.parse(
        window.atob(Cookies.get("token").split(".")[1])
      );
      if (Date.now() >= jwtPayload.exp * 1000) {
        return false;
      } else {
        return true;
      }
    }
    return false;

  }
  const isTokenValid = checkJWT();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {!isTokenValid ? (
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        ) : (
          <>
            <NavBar />
            <div style={{ marginTop: '20px' }}>
            <Routes>
              <Route path="/topartist" element={<TopArtistsWrapper />} />
              <Route path="/album/:artistId" element={<AlbumsWrapper />} />
              <Route path="/lyrics/:albumId" element={<Lyrics />} />
            </Routes>
            </div>
          </>

        )
        }
      </Router>
    </div>
  );
}

export default App;
