import React from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Display from "../../components/Display";
import Modals from "../../components/Modals";

import { Row, Col, Container } from "react-bootstrap";

export default function Home() {
  const visibleModal = useSelector((state) => state.modal.isVisible);

  return (
    <Container fluid className={style.h100vh}>
      {visibleModal && <Modals />}
      <Row className={style.h10}>
        <Header />
      </Row>
      <Row>
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
