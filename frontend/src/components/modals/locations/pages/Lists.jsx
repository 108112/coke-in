import React from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const locations = useSelector((state) => state.list.locations);
  return (
    <Accordion>
      {locations.map((location) => {
        return (
          <Accordion.Item eventKey={location._id} key={location._id}>
            <Accordion.Header>{`${location.name.floor}${location.name.area}`}</Accordion.Header>
            <Accordion.Body>
            {location.sections.map((section) => {
              <Accordion>
                <Accordion.Header>{section.name}</Accordion.Header>
                <Accordion.Body>location</Accordion.Body>
              </Accordion>
            })}  
            </Accordion.Body>;
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
