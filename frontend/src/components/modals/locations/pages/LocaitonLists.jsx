import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductLists from "../../products/pages/ProductLists";

import { setCurrentSection, setItems } from "../../../../features/listSlice";

import { Accordion } from "react-bootstrap";
import { loading } from "../../../../features/modalSlice";

function AccordionList() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.list.locations);

  const handleDataFetch = async (page) => {
    dispatch(loading());
    try {
      const response = await axios.get(`/api/${page}/all`);
      dispatch(setItems(response.data));
    } catch (err) {
      console.log(err);
    }
    dispatch(loading());
  };


  const selectSection = async (id) => {
    try {
      const response = await axios.get(`/api/locations/section/${id}/select`);
      handleDataFetch("items");
      dispatch(setCurrentSection(response.data));
    } catch (err) {
      console.log(err.response.data.message);
    }
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
                      <Accordion.Body
                        onClick={() => selectSection(section._id)}
                      >
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

export default function LocaitonLists() {
  const currentSection = useSelector((state) => state.list.currentSection);
  return <div>{currentSection ? <ProductLists /> : <AccordionList />}</div>;
}
