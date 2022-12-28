import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";
const Meeting = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listCalendar, setlistCalendar] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [schoolYearId, setschoolYearId] = useState(1);
  const [semesterId, setsemesterId] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        //console.log({ data });
        setlistyear(data.data.items);
      } catch (e) {}
    })();
  }, []);

  const show = async (schoolyear, semester) => {
    const { data } = await axios.get(
      `users/calendar?schoolYearId=${schoolyear}&semesterId=${semester}&calendarEventType=Meeting`
    );
    console.log(data);
    setlistCalendar(data.data.items);
  };
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <CFormSelect
          style={{ width: "200px" }}
          onChange={(e) => {
            setschoolYearId(Number(e.target.value));
            show(e.target.value, semesterId);
          }}
        >
          <option>Năm học</option>
          {listyear.map((item) => (
            <option value={item.schoolYearId} label={item.schoolYear}></option>
          ))}
        </CFormSelect>
        Học kì:
        <CFormSelect
          style={{ width: "10%" }}
          onChange={(e) => {
            setsemesterId(Number(e.target.value));
            show(schoolYearId, e.target.value);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </CFormSelect>
      </div>
      <table className="table table-bordered table-active">
        <thead>
          <tr>
            <th>Lịch</th>
            <th>Ngày</th>
            <th>Giờ xuất</th>
            <th>Kết thúc</th>
            <th>Phòng</th>
          </tr>
        </thead>
        <tbody>
          {listCalendar?.map((item) => (
            <tr key={item.calendarEventId}>
              <td>{item.calendarEvent}</td>
              <td>{item.calendarDate}</td>
              <td>{item.timeStart}</td>
              <td>{item.timeFinish}</td>
              <td>{item.roomName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Meeting;
