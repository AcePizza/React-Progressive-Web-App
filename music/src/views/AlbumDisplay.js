import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/esm/Row";
import { LoginStoreContextProvider } from "../components/context/loginContext";
import useFetchArtist from "../components/utils/useFetchArtist";

function AlbumDisplay({ element, index }) {
  return (
    <>
      <tbody>
        <tr>
          <td>
            <img width={"50px"} height={"50px"} src={element.thumb}></img>
          </td>
          <td>{element.title}</td>
          <td>{element.year}</td>
        </tr>
      </tbody>
    </>
  );
}

export default AlbumDisplay;
