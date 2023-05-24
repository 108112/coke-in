import React from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.list.locations);
  return (
    <Accordion>
      {locations.map((location) => {
        <Accordion.Item eventKey={location._id} key={location._id}>
          <Accordion.Header>{`${location.name.floor}${location.name.area}`}</Accordion.Header>
          <Accordion.Body>location</Accordion.Body>
        </Accordion.Item>
      })}
    </Accordion>
  );
}
