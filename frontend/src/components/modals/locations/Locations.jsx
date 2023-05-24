import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import News from "./pages/News";
import Lists from "./pages/Lists"

import { loading, setModalPages } from "../../../features/modalSlice";
import { setLocations } from "../../../features/listSlice";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FiDownload, FiList, FiLogIn, FiLogOut, FiPlus } from "react-icons/fi";

export default function Locations() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.modal.pages);
  const isLoading = useSelector((state) => state.modal.isLoading);

  const pages = {
    News: <News />,
    Lists: <Lists />
  }

  const handleDataFetch = async (page) => {
    dispatch(loading());
    try {
      const response = await axios.get(`api/${page}/all`);
      dispatch(setLocations(response.data));
    } catch (err) {
      console.log(err);
    }
    dispatch(loading());
  }

  const togglePages = (page) => {
    dispatch(setModalPages(page));
  }

  const handleOpenNews = (e) => {
    e.preventDefault();
    togglePages("News");
  }
  const handleOpenLists = (e) => {
    e.preventDefault();
    handleDataFetch("locations");
    togglePages("Lists");
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
            <span className="d-none d-sm-block">ロケーション登録</span>
          </button>
          <button className="menuItem">
            <FiDownload className="d-block d-sm-none" onClick={handleOpenLists} />
            <span className="d-none d-sm-block">格納する</span>
          </button>
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
