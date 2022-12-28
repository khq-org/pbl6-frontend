import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const Exam = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  var mapSubjects = {
    Biological: "Sinh học",
    Chemistry: "Hóa học",
    Civic_Education: "Giáo dục công dân",
    Defense_Education: "Giáo dục quốc phòng",
    English: "Tiếng Anh",
    Geographic: "Địa lý",
    History: "Lịch Sử",
    Informatics: "Tin học",
    Literature: "Ngữ văn",
    Maths: "Toán học",
    Physic: "Vật lý",
    Physical_Education: "Thể dục",
    Technology: "Tin học",
  };
  const [listclass, setlistclass] = useState([]);
  const [listCalendar, setlistCalendar] = useState([]);

  const [classId, setclassId] = useState(0);
  const [semesterId, setsemesterId] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users/classes");
        console.log({ data });
        setlistclass(data.data);
      } catch (e) {}
    })();
  }, []);
  const show = async (id, semester) => {
    const { data } = await axios.get(
      `users/calendar?classId=${id}&semesterId=${semester}&calendarEventType=Examination`
    );
    console.log(data);
    setlistCalendar(data.data.items);
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <CFormSelect
          style={{ width: "10%" }}
          onChange={(e) => {
            setclassId(Number(e.target.value));
            show(e.target.value, semesterId);
          }}
        >
          <option>Lớp</option>
          {listclass?.map((item) => (
            <option key={item.classId} value={item.classId}>
              {item.clazz}
            </option>
          ))}
        </CFormSelect>
        Học kì:
        <CFormSelect
          style={{ width: "10%" }}
          onChange={(e) => {
            setsemesterId(Number(e.target.value));
            show(classId, e.target.value);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </CFormSelect>
      </div>
      <table className="table table-bordered table-active">
        <thead>
          <tr>
            <th>Kì thi</th>
            <th>Môn thi</th>
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
              <td>{mapSubjects[item.subjectName?.replace(" ", "_")]}</td>
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
export default Exam;
