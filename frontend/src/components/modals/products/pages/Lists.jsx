import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../../search/Search";
import { Container, Table } from "react-bootstrap";

import { setCurrentItem } from "../../../../features/listSlice";
import axios from "axios";

export default function Lists() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.list.items);
  const pages = useSelector((state) => state.modal.pages);

  const selectItem = async (id) => {
    try {
      const response = await axios.get(`/api/items/${id}/select`);
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
            <th>内容量</th>
            <th>賞味期限</th>
            <th>PL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr
                key={item._id}
                onClick={() => pages !== "Lists" && selectItem(item._id)}
              >
                <td className="col-1">{item.product.code.JS}</td>
                <td className="col-1">{item.product.code.branch}</td>
                <td>{item.product.volume}ml</td>
                <td className="col-4">{item.bestBefore}</td>
                <td className="col-2">{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
