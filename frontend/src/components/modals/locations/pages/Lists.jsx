import React from "react";
import { Accordion, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const locations = useSelector((state) => state.list.locations);
  return (
    <Accordion>
      {locations.map((location) => {
        return (
          <Accordion.Item eventKey={location._id} key={location._id}>
            <Accordion.Header>{`${location.station}-${location.name.floor}${location.name.area}`}</Accordion.Header>
            <Accordion.Body>
              <Accordion flush>
                {location.sections.map((section) => {
                  return (
                    <Accordion.Item eventKey={section._id} key={section._id}>
                      <Accordion.Header>{section.name}</Accordion.Header>
                      <Accordion.Body>{section.item ? section.item.name : "空き"}</Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
