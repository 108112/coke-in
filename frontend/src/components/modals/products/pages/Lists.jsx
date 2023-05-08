import React from "react";
import { useSelector } from "react-redux";
import Search from "../../../search/Search";
import { Col, Container, Table } from "react-bootstrap";


export default function Lists() {
  const items = useSelector((state) => state.list.items);

  return (
    <Container>
      <Col>
        <Search />
        <Table striped bordered hover className="table-sticky">
          <thead>
            <tr>
              <th className="col-2">JSコード</th>
              <th>商品名</th>
              <th className="col-2">内容量</th>
              <th className="col-2">賞味期限</th>
              <th className="col-2">ロケ</th>
              <th className="col-1">PL</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="col-2">{item.product.code}</td>
                  <td>{item.product.name}</td>
                  <td className="col-2">{item.product.volume}ml</td>
                  <td className="col-2">{item.bestBefore}</td>
                  <td className="col-2">{item.location}</td>
                  <td className="col-1">{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
}
