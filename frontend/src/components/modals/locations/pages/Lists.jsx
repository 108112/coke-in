import React from "react";
import axios from "axios";
import { setCurrentSection } from "../../../../features/listSlice";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Lists() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.list.locations);

  const selectSection = async (id) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/locations/${id}/select`);
      dispatch(setCurrentSection(response.data));
    } catch (err) {}
  };
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
                      <Accordion.Body onClick={() => selectSection(section._id)}>
                        {section.item ? section.item.name : "空き"}
                      </Accordion.Body>
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
