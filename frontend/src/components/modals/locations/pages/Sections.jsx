import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../../../features/listSlice";
import { Container, Form, Row } from "react-bootstrap";
import Search from "../../../search/Search";

export default function Sections() {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.list.locations);
  const currentLocation = useSelector((state) => state.list.currentLocation);
  const values = useSelector((state) => state.form.values);
  const validate = useSelector((state) => state.form.validate);

  //////Handlers//////
  const selectLocation = async (id) => {
    try {
      const response = await axios.get(`/api/locatiions/${id}/select`);
      dispatch(setCurrentLocation(response.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {currentLocation ? (
        <Form>
          <h4>列番号を登録</h4>
          <Row>
            {/*レイアウト
            左上にcurrentLocationを表示(ST-1A)
            登録済みの列番号を表示
            登録後、続けてアイテムを格納するかの選択画面を表示 */}
          </Row>
        </Form>
      ) : (
        <Container fluid>
          <Search />
          {/*プルダウンリスト locaitons.mapで展開
          selectLocationでcurrentLocationをdispatch*/}
        </Container>
      )}
    </div>
  );
}
