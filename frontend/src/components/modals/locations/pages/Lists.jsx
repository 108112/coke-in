import React from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.list.locations);
  return (
    <Accordion>
      {locations.map((location) => {
        <Accordion.Item>
          <Accordion.Header>{`${location.name.floor}${location.name.area}`}</Accordion.Header>
          {location.sections.map((section) => {
            <Accordion.Body>{section.name}</Accordion.Body>;
          })}
        </Accordion.Item>;
      })}
    </Accordion>
  );
}
