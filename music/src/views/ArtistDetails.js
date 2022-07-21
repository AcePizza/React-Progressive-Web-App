import React from "react";
import { useParams } from "react-router-dom";

function ArtistDetails() {
  let { artistName } = useParams();

  return (
    <div>
      <p>Artist details for {artistName}</p>
    </div>
  );
}

export default ArtistDetails;
