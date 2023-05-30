import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setModalPages, loading } from "../../../features/modalSlice";
import { resetForm } from "../../../features/formSlice";

import News from "./pages/News";
import Receipts from "./pages/Receipts";
import Shipments from "./pages/Shipments";

import "./Products.css";

import { resetList, setItems } from "../../../features/listSlice";

import { FiPlus, FiLogIn, FiLogOut, FiList } from "react-icons/fi";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ProductLists from "./pages/ProductLists";

export default function Products() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.modal.pages);
  const isLoading = useSelector((state) => state.modal.isLoading);

  const pages = {
    News: <News />,
    Receipts: <Receipts />,
    Shipments: <Shipments />,
    ProductLists: <ProductLists />,
  };

  const togglePages = (page) => {
    dispatch(setModalPages(page));
    dispatch(resetList());
    dispatch(resetForm());
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
    togglePages("ProductLists");
  };

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
            <span className="d-none d-sm-block">新商品の登録</span>
          </button>
          <button className="menuItem" onClick={handleOpenReceipts}>
            <FiLogIn className="d-block d-sm-none" />
            <span className="d-none d-sm-block">入庫する</span>
          </button>
          <button className="menuItem" onClick={handleOpenShipments}>
            <FiLogOut className="d-block d-sm-none" />
            <span className="d-none d-sm-block">出庫する</span>
          </button>
          <button className="menuItem" onClick={handleOpenLists}>
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
