import React from "react";
import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";

export default function Lists() {
  const locations = useSelector((state) => state.list.locations);

  return (
    <Accordion>
      {locations.map((location) => {
        <Accordion.Item eventKey={location._id}>
          <Accordion.Header>{location.name}</Accordion.Header>
          <Accordion.Body>
            <Accordion>
              {location.sections.map((section) => {
                return (
                  <Accordion.Item eventKey={section._id}>
                    <Accordion.Header>{section.name}</Accordion.Header>
                    <Accordion.Body>{section.item.map((item) => item.name)}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>;
      })}
    </Accordion>
  );
}
