import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../../../features/listSlice";
import { Accordion, Container } from "react-bootstrap";
import Search from "../../../search/Search";

export default function Lists() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.list.locations);
  const pages = useSelector((state) => state.modal.pages);

  const selectLocation = async (id) => {
    try {
      const response = await axios.get(`/api/locations/${id}/select`);
      dispatch(setCurrentLocation(response.data));
    } catch (err) {
      console.log(err);
    }
  };
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
