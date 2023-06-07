import React from "react";
import { useDispatch } from "react-redux";

import { openSidebar } from "../features/sidebarSlice";

import { Container } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

export default function Header() {
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };
  return (
    <Container>
      <List
        className="list"
        onClick={handleOpenSidebar}
        size={48}
      />
    </Container>
  );
}
