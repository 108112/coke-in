import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const locations = useSelector((state) => state.list.locations);
  return (
    <Accordion defaultActiveKey={0}>
      {locations.map((location) => {
        return (
          <Accordion.Item eventKey={location._id} key={location._id}>
            <Accordion.Header>{`${location.station}-${location.name.floor}${location.name.area}`}</Accordion.Header>
            <Accordion.Body>
              {location.sections.map((section) => {
                return (
                  <ListGroup key={section._id} horizontal>
                    <ListGroup.Item as={3}>{section.name}</ListGroup.Item>
                    <ListGroup.Item as={9}>空き</ListGroup.Item>
                  </ListGroup>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
