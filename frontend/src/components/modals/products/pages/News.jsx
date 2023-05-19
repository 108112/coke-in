import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setErrors, setValues, setValidate } from "../../../../features/formSlice";

import { Col, Row, Form, Button } from "react-bootstrap";

import "../Products.css";

export default function News() {
  const dispatch = useDispatch();
  
  const values = useSelector((state) => state.form.values);
  const validate = useSelector((state) => state.form.validate);

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
        const response = await axios.post("/api/products/regist", values);
        alert(response.data.message);
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        }
        dispatch(setErrors(err.message));
      }
    }
    dispatch(setValidate(true));
  };

  return (
    <Form noValidate validated={validate} onSubmit={handleSubmit}>
      <h4 className="text-center">新商品の情報を入力</h4>
      <Row className="mb-2">
        <Row className="d-flex justify-content-center mb-2">
          <Form.Group as={Col} md="5" controlId="JS">
            <Form.Label>JS</Form.Label>
            <Form.Control
              required
              type="number"
              name="code"
              minLength={5}
              maxLength={5}
              placeholder="00000"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid" id="JS">
              5文字のJSコードを入力してください
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="branch">
            <Form.Label>枝番</Form.Label>
            <Form.Control
              required
              type="number"
              name="branch"
              minLength={4}
              maxLength={4}
              placeholder="0000"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid" id="branch">
              4文字の枝番を入力してください
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center mb-2">
          <Form.Group as={Col} md="8" controlId="name">
            <Form.Label>製品名</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              minLength={4}
              maxLength={12}
              placeholder="コカ・コーラ"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              4~12文字で入力してください
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center mb-2">
          <Form.Group as={Col} md="4" controlId="volume">
            <Form.Label>容量</Form.Label>
            <Form.Control
              required
              type="number"
              name="volume"
              minLength={3}
              maxLength={4}
              placeholder="1500"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              3~4文字の数字を入力してください
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="maxLoad">
            <Form.Label>積載数</Form.Label>
            <Form.Control
              required
              type="number"
              name="maxLoad"
              minLength={2}
              maxLength={3}
              placeholder="64"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              2~3文字の数字を入力してください
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Row>
      <Row>
        <Button type="submit" className="col-4 mx-auto" variant="cola">
          送信
        </Button>
      </Row>
    </Form>
  );
}
