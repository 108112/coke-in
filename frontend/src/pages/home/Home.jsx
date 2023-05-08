import React from "react";
import { useSelector } from "react-redux";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Display from "../../components/display/Display";
import Modals from "../../components/modals/Modals";

import { Row, Col, Container } from "react-bootstrap";
import style from "./Home.module.css"

export default function Home() {
  const visibleModal = useSelector((state) => state.modal.isVisible);

  return (
    <Container fluid className={style.h100vh}>
      {visibleModal && <Modals />}
      <Row className={style.h10}>
        <Header />
      </Row>
      <Row className={style.h90}>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col xs={12}>
          <Display />
        </Col>
      </Row>
    </Container>
  );
}
