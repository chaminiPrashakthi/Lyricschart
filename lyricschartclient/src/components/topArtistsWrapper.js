import React from "react";
import { useNavigate } from "react-router-dom";
import Topartists from "./topArtists";
import { useSelector } from "react-redux";

const TopArtistsWrapper = (props) => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  return <Topartists {...props} navigate={navigate} />;
};

export default TopArtistsWrapper;
