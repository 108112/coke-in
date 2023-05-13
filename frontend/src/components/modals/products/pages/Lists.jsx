import React from "react";
import { useSelector } from "react-redux";
import Search from "../../../search/Search";
import { Col, Container, Table } from "react-bootstrap";


export default function Lists() {
  const items = useSelector((state) => state.list.items);

  return (
      <Col xs={12}>
        <Search />
        <Table striped bordered hover className="table-sticky">
          <thead>
            <tr>
              <th>JSコード</th>
              <th>商品名</th>
              <th>内容量</th>
              <th>賞味期限</th>
              <th>ロケ</th>
              <th>PL</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.product.code}</td>
                  <td>{item.product.name}</td>
                  <td>{item.product.volume}ml</td>
                  <td>{item.bestBefore}</td>
                  <td>{item.location}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
  );
}
