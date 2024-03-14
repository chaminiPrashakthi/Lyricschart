import React from "react";
import { useNavigate } from "react-router-dom";
import Albums from "./albums";

const AlbumsWrapper = (props) => {
  const navigate = useNavigate();
  return <Albums {...props} navigate={navigate} />;
};

export default AlbumsWrapper;
