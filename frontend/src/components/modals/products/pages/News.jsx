import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setErrors, setValues } from "../../../../features/formSlice";

import { Col, Row, Form, Button } from "react-bootstrap";

import "../Products.css"

export default function News() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  
  const values = useSelector((state) => state.form.values);
  const errors = useSelector((state) => state.form.errors);
  
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
        const response = await axios.post("/api/products/regist", values);
        console.log(response.data.message);
      } catch (err) {
        dispatch(setErrors(err.response.data.message));
      }
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-2 text-center">
        <h4>新商品の情報を入力</h4>
      </Row>
      <Row className="mb-2 d-flex justify-content-center">
        <Form.Group as={Col} md="4" controlId="code">
          <Form.Label>JSコード</Form.Label>
          <Form.Control
            required
            type="text"
            name="code"
            minLength={5}
            maxLength={5}
            placeholder="00000"
            onChange={handleInputChange}
            isInvalid={!!errors}
          />
          <Form.Control.Feedback type="invalid" id="code">
            {errors || "5文字で入力してください"}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="exCode">
          <Form.Label>枝番</Form.Label>
          <Form.Control
            required
            type="text"
            name="exCode"
            minLength={4}
            maxLength={4}
            placeholder="0000"
            onChange={handleInputChange}
            isInvalid={!!errors}
          />
          <Form.Control.Feedback type="invalid" id="exCode">
            {errors || "4文字で入力してください"}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-2 d-flex justify-content-center">
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
      <Row className="mb-3 d-flex justify-content-center">
        <Form.Group as={Col} md="4" controlId="volume">
          <Form.Label>容量</Form.Label>
          <Form.Control
            required
            type="text"
            name="volume"
            minLength={3}
            maxLength={4}
            placeholder="1500"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            3文字または4文字で入力してください
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="maxLoad">
          <Form.Label>積載数</Form.Label>
          <Form.Control
            required
            type="text"
            name="maxLoad"
            minLength={2}
            maxLength={3}
            placeholder="64"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            2文字または3文字で入力してください
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Button type="submit" className="col-4 mx-auto" variant="cola" >
          送信
        </Button>
      </Row>
    </Form>
  );
}
