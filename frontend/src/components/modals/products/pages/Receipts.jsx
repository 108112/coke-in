import React from "react";
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
  setValidate,
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

const dispatch = useDispatch();

function Receipt() {
  const currentItem = useSelector((state) => state.list.currentItem);
  const values = useSelector((state) => state.form.values);
  const validate = useSelector((state) => state.form.validate);

  //////Handlers//////
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setValues({ ...values, [name]: value }));
    dispatch(setValidate(false));
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
    dispatch(setValidate(true));
  };
  return (
    <Form noValidate validated={validate} onSubmit={handleSubmit}>
      <h3 className="fw-bold text-center mb-3">製品を入庫する</h3>
      <Row>
        <Col xs={12} md={7}>
          <Row xs={12}>
            <ListGroup as={Col} xs={12} horizontal className="mb-3">
              <ListGroup.Item>JS</ListGroup.Item>
              <ListGroup.Item>{currentItem.code.JS}</ListGroup.Item>
            </ListGroup>
            <ListGroup as={Col} xs={12} horizontal className="mb-3">
              <ListGroup.Item>枝番</ListGroup.Item>
              <ListGroup.Item>{currentItem.code.branch}</ListGroup.Item>
            </ListGroup>
          </Row>
          <Row xs={12}>
            <ListGroup horizontal className="mb-3">
              <ListGroup.Item>製品名</ListGroup.Item>
              <ListGroup.Item>{currentItem.name}</ListGroup.Item>
            </ListGroup>
          </Row>
          <Row xs={12}>
            <ListGroup horizontal className="mb-3">
              <ListGroup.Item>容量</ListGroup.Item>
              <ListGroup.Item>{currentItem.volume}ml</ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <ListGroup horizontal className="mb-3">
              <ListGroup.Item>積載数</ListGroup.Item>
              <ListGroup.Item>{currentItem.maxLoad} cs</ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
        <Col xs={12} md={5}>
          <FormGroup className="mb-2" controlId="quantity">
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
          <FormGroup className="mb-2" controlId="bestBefore">
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
  );
}

function ReceiptLists() {
  const items = useSelector((state) => state.list.items);

  const selectItem = async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}/select`);
      dispatch(setCurrentItem(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Search />
      <Table striped bordered hover className="table-sticky">
        <thead>
          <tr>
            <th>JS</th>
            <th>枝番</th>
            <th>商品名</th>
            <th>内容量</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item._id} onClick={() => selectItem(item._id)}>
                <td className="col-1">{item.code.JS}</td>
                <td className="col-1">{item.code.branch}</td>
                <td>{item.name}</td>
                <td>{item.volume}ml</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default function Receipts() {
  const currentItem = useSelector((state) => state.list.currentItem);

  return <div>{currentItem ? <Receipt /> : <ReceiptLists />}</div>;
}
