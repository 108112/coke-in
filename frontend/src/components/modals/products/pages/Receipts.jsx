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

export default function Receipts() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const items = useSelector((state) => state.list.items);
  const currentItem = useSelector((state) => state.list.currentItem);
  const values = useSelector((state) => state.form.values);

  //////Handlers//////
  const selectItem = async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}/select`);
      dispatch(setCurrentItem(response.data));
    } catch (err) {
      console.log(err);
    }
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
        const response = await axios.post(
          `/api/items/${currentItem._id}/receipt`,
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
          <Row className="text-center mb-4">
            <h3 className="fw-bold">製品を入庫する</h3>
          </Row>
          <Row className="mb-4">
            <Col xs={6}>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="col-4">JS</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.code.JS}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="col-4">枝番</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.code.branch}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="col-4">製品名</ListGroup.Item>
                <ListGroup.Item className="col-7 text-truncate">
                  {currentItem.name}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="mb-2">
                <ListGroup.Item className="col-4">容量</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.volume}ml
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroup.Item className="px-2 col-4">積載数</ListGroup.Item>
                <ListGroup.Item className="col-4">
                  {currentItem.maxLoad} cs
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col className="pull-right">
              <FormGroup as={Col} className="mb-2 col-4" controlId="formGridQty">
                <Form.Label>数量</Form.Label>
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
              <FormGroup
                as={Col}
                className="mb-2 col-6"
                controlId="formGridBestBefore"
              >
                <Form.Label>賞味期限</Form.Label>
                <Form.Control
                  type="date"
                  name="bestBefore"
                  min={"1900-01-01"}
                  max={"2099-12-31"}
                  onChange={handleInputChange}
                  required
                  placeholder="1900/01/01"
                />
                <Form.Control.Feedback type="invalid">
                  日付を入力してください
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button type="submit" style={{ width: "40%" }} variant="danger">
              送信
            </Button>
          </Row>
        </Form>
      ) : (
        <Container>
          <Search />
          <Table striped bordered hover className="table-sticky table-fixed">
            <thead>
              <tr>
                <th className="col-2">JS</th>
                <th className="col-1">枝番</th>
                <th className="col-6">商品名</th>
                <th className="col-2">内容量</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item._id} onClick={() => selectItem(item._id)}>
                    <td className="col-2">{item.code.JS}</td>
                    <td className="col-1">{item.code.branch}</td>
                    <td className="col-6">{item.name}</td>
                    <td className="col-2">{item.volume}ml</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
}
