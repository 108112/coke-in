import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
                    <Accordion.Body>
                      <Accordion>
                        {section.items.map((item) => {
                          return (
                            <Accordion.Item eventKey={item._id}>
                              <Accordion.Header>{item.name}</Accordion.Header>
                              <Accordion.Body>{item.quantity}</Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </Accordion.Body>
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
