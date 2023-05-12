import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setModalPages, loading } from "../../../features/modalSlice";
import { resetErrors, resetValues } from "../../../features/formSlice";

import News from "./pages/News copy";
import Receipts from "./pages/Receipts";
import Shipments from "./pages/Shipments";
import Lists from "./pages/Lists";

import "./Products.css";

import {
  resetCurrentItem,
  resetItems,
  setItems,
} from "../../../features/listSlice";
import { Col, Container, Row, Spinner } from "react-bootstrap";

export default function Products() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.modal.pages);
  const isLoading = useSelector((state) => state.modal.isLoading);

  const pages = {
    News: <News />,
    Receipts: <Receipts />,
    Shipments: <Shipments />,
    Lists: <Lists />,
  };

  const togglePages = (page) => {
    dispatch(setModalPages(page));
    dispatch(resetItems());
    dispatch(resetCurrentItem());
    dispatch(resetValues());
    dispatch(resetErrors());
  };

  const handleDataFetch = async (page) => {
    dispatch(loading());
    try {
      const response = await axios.get(`/api/${page}/all`);
      dispatch(setItems(response.data));
    } catch (err) {
      console.log(err);
    }
    dispatch(loading());
  };

  //////handlers//////
  const handleOpenNews = (e) => {
    e.preventDefault();
    togglePages("News");
  };
  const handleOpenReceipts = (e) => {
    e.preventDefault();
    handleDataFetch("products");
    togglePages("Receipts");
  };
  const handleOpenShipments = (e) => {
    e.preventDefault();
    handleDataFetch("items");
    togglePages("Shipments");
  };
  const handleOpenLists = (e) => {
    e.preventDefault();
    handleDataFetch("items");
    togglePages("Lists");
  };

  return (
    <Container>
      <Row className="h60vh">
        <Col
          xs={3}
          className="d-flex flex-column"
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          <button className="menuItem" onClick={handleOpenNews}>
            新商品の登録
          </button>
          <button className="menuItem" onClick={handleOpenReceipts}>
            入庫する
          </button>
          <button className="menuItem" onClick={handleOpenShipments}>
            出庫する
          </button>
          <button className="menuItem" onClick={handleOpenLists}>
            製品一覧
          </button>
          <button className="menuItem">入出荷履歴</button>
        </Col>
        <Col xs={9}>
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
