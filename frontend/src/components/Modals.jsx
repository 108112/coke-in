import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import { resetModal } from "../features/modalSlice";
import { resetList } from "../features/listSlice";

import Products from "./products/Products";
import Locations from "./modals/locations/Locations";

import { Modal } from "react-bootstrap";

export default function Modals() {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.modal.component);
  const modal = useSelector((state) => state.modal.isVisible);
  const validate = useSelector((state) => state.form.validate);

  const components = {
    Products: <Products />,
    Locations: <Locations />,
  };

  const handleCloseModals = (e) => {
    dispatch(resetModal());
    dispatch(resetList());
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modal}
      onHide={handleCloseModals}
    >
      <Modal.Header closeButton className="colaColor"></Modal.Header>
      <Modal.Body style={{ height: validate || isMobile ? "80vh" : "60vh" }}>
        {component && components[component]}
      </Modal.Body>
    </Modal>
  );
}
