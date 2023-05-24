import React from "react";
import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";

export default function Lists() {
  const locations = useSelector((state) => state.list.locations);

  return (
    <Accordion>
      {locations.map((location) => {
        return (
          <Accordion.Item key={location._id} eventKey={location._id}>
            <Accordion.Header>{`${location.name.floor}${location.name.area}`}</Accordion.Header>
            <Accordion.Body>
             {location.sections[0].name}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
