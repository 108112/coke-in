import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { visibleModal } from "../../features/modalSlice";
import { closeSidebar } from "../../features/sidebarSlice";

import Products from "../modals/products/Products";
import Locations from "../modals/locations/Locations";

import style from "./Sidebar.module.css";
import { Container, Offcanvas } from "react-bootstrap";

export default function Sidebar() {
  const dispatch = useDispatch();

  const isVisibleSidebar = useSelector((state) => state.sidebar.isVisible);

  const openModals = (component) => {
    dispatch(closeSidebar());
    dispatch(visibleModal(component.name));
  };

  //////handlers//////
  const handleOpenProductsModal = (e) => {
    e.preventDefault();
    openModals(Products);
  };
  const handleOpenLocationsModal = (e) => {
    e.preventDefault();
    openModals(Locations);
  };
  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <Container>
      <Offcanvas
        show={isVisibleSidebar}
        onHide={handleCloseSidebar}
        className={style.container}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={style.menuItem} onClick={handleOpenProductsModal}>
            Products
          </div>
          <div className={style.menuItem} onClick={handleOpenLocationsModal}>
            Locations
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
