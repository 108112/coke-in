import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setErrors,
  setValidate,
  setValues,
} from "../../../../features/formSlice";

import { Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import axios from "axios";

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
        const response = await axios.post("/api/locations/regist", values);
        alert(response.data.message);
      } catch (err) {
        if (err.response.status === 409) {
          alert(err.response.data.message);
        }
        dispatch(setErrors(err.message));
      }
    }
    dispatch(setValidate(true));
  };

  return (
    <Form noValidate validated={validate} onSubmit={handleSubmit}>
      <h4 className="text-center">ロケーション情報を入力</h4>
      <Row className="d-flex justify-content-center mb-2">
        <FormGroup as={Col} md="5" controlId="floor">
          <FormLabel>階層</FormLabel>
          <Form.Control
            required
            type="number"
            name="floor"
            minLength={1}
            maxLength={1}
            placeholder="1"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid" id="floor">
            階層を入力してください
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup as={Col} md="3" controlId="area">
          <FormLabel>エリア</FormLabel>
          <Form.Control
            required
            type="text"
            name="area"
            minLength={1}
            maxLength={1}
            placeholder="A"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid" id="area">
            大文字のアルファベットを入力してください
          </Form.Control.Feedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup as={Col} md="5" controlId="col">
          <FormLabel>1アイテムの最大格納数</FormLabel>
          <Form.Control
            required
            type="number"
            name="col"
            minLength={1}
            maxLength={2}
            placeholder="56"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid" id="col">
            PL数を入力してください
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup as={Col} md="5" controlId="row">
          <FormLabel>アイテム数</FormLabel>
          <Form.Control
            required
            type="number"
            name="row"
            minLength={1}
            maxLength={2}
            placeholder="4"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid" id="floor">
            アイテム数を入力してください
          </Form.Control.Feedback>
        </FormGroup>
      </Row>
      <Row>
        <Button type="submit" className="col-4 mx-auto" variant="cola">
          送信
        </Button>
      </Row>
    </Form>
  );
}
