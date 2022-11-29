import React from "react";

import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
  CForm,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDate, getDay, isToday } from "date-fns";

const Exam = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistTeacher] = useState([]);
  const [listCalendar, setlistCalendar] = useState([]);
  const [clazz, setclazz] = useState(1);
  const [visible, setVisible] = useState(false);
  const [title, settitle] = useState("");
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const tiet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        //console.log(data);
        setlistyear(data.data.items);
        const res = await axios.get("classes");
        setlistclass(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "calendars?classId=1&calendarType=Study"
        );
        //console.log(data);
        setlistCalendar(data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("teachers");
        //console.log({ data });
        setlistTeacher(data.data.items);
      } catch (e) {}
    })();
  }, []);
  const setc = async (id) => {
    const { data } = await axios.get(
      `calendars?classId=${id}&calendarType=Study`
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
      <CModal
        size="lg"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="container-form"></div>
        </CModalBody>
      </CModal>
      <div style={{ height: "60%", width: "100%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <table className="table table-dark">
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "7%" }}>Năm học:</td>
                <td>
                  <CFormSelect>
                    {listyear?.map((item) => (
                      <option
                        value={item.schoolYearId}
                        label={item.schoolYear}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "5%" }}>Lớp:</td>
                <td>
                  <CFormSelect
                    onChange={(e) => {
                      setc(e.target.value);
                      setclazz(e.target.value);
                    }}
                  >
                    {listclass?.map((items) => (
                      <option
                        value={items.classId}
                        label={items.clazz}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "50%" }}>
                  Thời gian áp dụng: <input type="date" />
                </td>
                <td>
                  <CButton
                    onClick={(e) => {
                      setVisible(true);
                      settitle("Thêm mới");
                    }}
                    className="btn btn-primary"
                    type="button"
                  >
                    Thêm mới
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ width: "100%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div class="table-wrer-scroll-y my-custom-scrollbar">
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
                    <td>Tiết{item}</td>
                    {day.map((items) => (
                      <td style={{ width: "14%" }}>
                        {findcalendar(item, items) ? (
                          <div>
                            {findcalendar(item, items)?.calendarEvent}-
                            {findcalendar(item, items)?.teacher.lastName}&nbsp;
                            {findcalendar(item, items)?.teacher.firstName}
                            <CDropdown>
                              <CDropdownToggle color="white"></CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem>
                                  <Link
                                    onClick={(e) => {
                                      setVisible(true);
                                      settitle("Sửa");
                                    }}
                                  >
                                    Sửa
                                  </Link>
                                </CDropdownItem>
                                <CDropdownItem>
                                  <Link>Xóa</Link>
                                </CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
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
          </div>
          {/* <div className="mt-5 text-center">
            <button className="btn btn-primary profile-button" type="button">
              Cập nhật
            </button>
          </div> */}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Exam;
