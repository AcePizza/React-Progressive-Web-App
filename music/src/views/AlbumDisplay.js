import React, { useContext, useEffect, useState } from "react";

function AlbumDisplay({ element, index }) {
  return (
    <tbody key={index}>
      <tr>
        <td>
          <img width={"50px"} height={"50px"} src={element.thumb}></img>
        </td>
        <td>{element.title}</td>
        <td>{element.year}</td>
      </tr>
    </tbody>
  );
}

export default AlbumDisplay;
