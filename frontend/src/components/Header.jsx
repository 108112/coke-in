import React from "react";
import { useDispatch } from "react-redux";

import { openSidebar } from "../features/sidebarSlice";

import { Row } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

export default function Header() {
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };
  return (
    <Row>
      <List onClick={handleOpenSidebar} />
    </Row>
  );
}
