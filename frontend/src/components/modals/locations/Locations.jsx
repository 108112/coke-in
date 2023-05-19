import React from "react";
import { useDispatch, useSelector } from "react-redux";

import News from "./pages/News";
import { setModalPages } from "../../../features/modalSlice";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FiDownload, FiList, FiLogIn, FiLogOut, FiPlus } from "react-icons/fi";

export default function Locations() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.modal.pages);
  const isLoading = useSelector((state) => state.modal.isLoading);

  const pages = {
    News: <News />
  }

  const togglePages = (page) => {
    dispatch(setModalPages(page));
  }

  const handleOpenNews = (e) => {
    e.preventDefault();
    togglePages("News");

  }
  return (
    <Container>
      <Row>
        <Col
          xs={2}
          md={3}
          className="d-flex flex-column"
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          <button className="menuItem" onClick={handleOpenNews}>
            <FiPlus className="d-block d-sm-none" />
            <span className="d-none d-sm-block">新規登録</span>
          </button>
          <button className="menuItem">
            <FiLogIn className="d-block d-sm-none" />
            <span className="d-none d-sm-block">番号を登録</span>
          </button>
          <button className="menuItem">
            <FiDownload className="d-block d-sm-none" />
            <span className="d-none d-sm-block">格納する</span>
          </button>
          <button className="menuItem">
            <FiLogOut className="d-block d-sm-none" />
            <span className="d-none d-sm-block">出庫する</span>
          </button>
          <button className="menuItem">
            <FiList className="d-block d-sm-none" />
            <span className="d-none d-sm-block">製品一覧</span>
          </button>
          <button className="menuItem">入出荷履歴</button>
        </Col>
        <Col xs={10} md={9}>
          <div>
            {isLoading ? (
              <Spinner animation="border" size="md" />
            ) : (
              page && pages[page]
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
