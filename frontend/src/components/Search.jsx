import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { resetList, setItems } from "../features/listSlice";

import { Form } from "react-bootstrap";

export default function Search() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.modal.pages);

  const handleSearch = async (e) => {
    const value = e.target.value;
    const routes = {
      Receipts: "products",
      Lists: "items",
    };
    try {
      const response = await axios.get(
        `/${page && routes[page]}/search?q=${value}`
      );
      dispatch(setItems(response.data));
    } catch (err) {
      if (err.response.status === 404) {
        dispatch(resetList())
      }
    }
  };

  return (
    <Form className="mt-1 mb-3">
      <Form.Control type="text" placeholder="検索" onChange={handleSearch} />
    </Form>
  );
}
