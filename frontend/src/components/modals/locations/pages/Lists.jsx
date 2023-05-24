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
              {location.sections.map((section) => {
                <Accordion>
                  <Accordion.Item key={section._id} eventKey={section._id}>
                    <Accordion.Header>{section.name}</Accordion.Header>
                    <Accordion.Body>location</Accordion.Body>
                  </Accordion.Item>
                </Accordion>;
              })}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
