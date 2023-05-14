import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentItem,
  resetCurrentItem,
} from "../../../../features/listSlice";
import {
  resetValues,
  setErrors,
  setValues,
} from "../../../../features/formSlice";

import Search from "../../../search/Search";

import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import Lists from "./Lists";

export default function Shipments() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const items = useSelector((state) => state.list.items);
  const currentItem = useSelector((state) => state.list.currentItem);
  const values = useSelector((state) => state.form.values);

  //////Handlers//////
  const selectItem = async (id) => {
    const response = await axios.get(`/items/${id}/select`);
    dispatch(setCurrentItem(response.data));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setValues({ ...values, [name]: value }));
    setValidated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.put(
          `/items/${currentItem._id}/shipment`,
          values
        );
        alert(response.data.message);
        dispatch(resetValues());
        dispatch(resetCurrentItem());
      } catch (err) {
        dispatch(setErrors(err.response.data.message));
      }
    }
    setValidated(true);
  };

  return (
    <div>
      {currentItem ? (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="text-center mb-2">
            <h3 className="fw-bold">製品を出庫する</h3>
          </Row>
          <Row>
            <Col xs={6}>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">JSコード</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.product.code.JS}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">枝番</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.product.code.branch}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">製品名</ListGroup.Item>
                <ListGroup.Item className="col-7 text-truncate">
                  {currentItem.product.name}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">容量</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.product.volume}ml
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroup.Item className="px-2">積載数</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.product.maxLoad} cs
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">ロケーション</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.location}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">賞味期限</ListGroup.Item>
                <ListGroup.Item className="col-6">
                  {currentItem.bestBefore}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="px-2">数量</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.quantity} PL
                </ListGroup.Item>
              </ListGroup>
              <FormGroup as={Col} className="mb-2" controlId="formGridQty">
                <Form.Label>出庫数</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  onChange={handleInputChange}
                  required
                  maxLength={2}
                  placeholder="00"
                />
                <Form.Control.Feedback type="invalid">
                  数量を入力してください
                </Form.Control.Feedback>
              </FormGroup>
              <Button type="submit" style={{ width: "40%" }} variant="danger">
                送信
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Lists />
      )}
    </div>
  );
}
