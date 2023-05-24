import React from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const locations = useSelector((state) => state.list.locations);
  return (
    <Accordion defaultActiveKey={0}>
      {locations.map((location) => {
        return (
          <Accordion.Item eventKey={location._id} key={location._id}>
            <Accordion.Header>{`${location.name.floor}${location.name.area}`}</Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey={0} flush>
                {location.sections.map((section) => {
                  return (
                    <Accordion.Item key={section._id} eventKey={section._id}>
                      <Accordion.Header>{section.name}</Accordion.Header>
                      <Accordion.Body>location</Accordion.Body>
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
