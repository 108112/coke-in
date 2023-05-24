import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { setCurrentSection } from "../../../../features/listSlice";

export default function Lists() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.list.locations);
  const currentSection = useSelector((state) => state.list.currentSection);

  // const selectSection = async (id) => {
  //   try {
  //     const response = await axios.get(`/api/locations/${id}/select`);
  //     dispatch(setCurrentSection(response.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Accordion>
      {locations.map((location) => {
        return (
          <Accordion.Item key={location._id} eventKey={location._id}>
            <Accordion.Header>{`${location.name.floor}${location.name.area}`}</Accordion.Header>
            {location.sections.map((section) => {
              <Accordion.Body>{`${section.name}`}</Accordion.Body>;
            })}
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
