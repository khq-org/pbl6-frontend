import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const Meeting = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listCalendar, setlistCalendar] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users/calendar?calendarType=Meeting");
        console.log(data);
        setlistCalendar(data.data.items);
      } catch (e) {}
    })();
  }, []);

  return (
    <>
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
