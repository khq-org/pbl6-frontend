import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const Calendar = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const tiet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    Technology: "Công nghệ",
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
      `users/calendar?classId=${id}&semesterId=${semester}&calendarEventType=Study`
    );
    console.log(data);
    setlistCalendar(data.data.items);
  };
  const findcalendar = (tiet, day) => {
    return listCalendar?.find((element) => {
      return element.dayOfWeek === day && element.lessonStart === tiet;
    });
  };
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
            <th></th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
          </tr>
        </thead>
        <tbody>
          {tiet.map((item) => (
            <tr>
              <td className="text-center" style={{ color: "#0d6efd" }}>
                Tiết {item}
              </td>
              {day.map((items) => (
                <td style={{ width: "15%" }}>
                  {findcalendar(item, items) ? (
                    <div>
                      {
                        mapSubjects[
                          findcalendar(item, items)?.subjectName.replace(
                            " ",
                            "_"
                          )
                        ]
                      }
                      -{findcalendar(item, items)?.teacher.lastName}
                      &nbsp;
                      {findcalendar(item, items)?.teacher.firstName}
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Calendar;
