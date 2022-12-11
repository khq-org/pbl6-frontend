import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
import axios from "axios";
import { useState, useEffect } from "react";

import { COLUMNS } from "./columns";

import "./table.css";

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
import { GlobalFilter } from "../../schooladmin/GlobalFilter";

import { Link } from "react-router-dom";
import { element } from "prop-types";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
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

  const [listroom, setlistroom] = useState([]);
  const [listCalendar, setlistCalendar] = useState([]);
  const [visible, setVisible] = useState(false);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistteacher] = useState([]);
  const [listclass, setlistclass] = useState([]);

  const [calendarEventName, setcalendarEventName] = useState("");
  const [calendarEventType, setcalendarEventType] = useState("Meeting");
  const [classIds, setclassIds] = useState([]);
  const [userIds, setuserIds] = useState([]);
  const [schoolYearId, setschoolYearId] = useState(1);
  const [timeStart, settimeStart] = useState("");
  const [timeFinish, settimeFinish] = useState("");
  const [semesterId, setsemesterId] = useState(1);
  const [date, setdate] = useState("");
  const [roomName, setroomName] = useState("");
  const [roomId, setroomId] = useState(0);
  const [subjectId, setsubjectId] = useState(0);
  const [listsubject, setlistsubject] = useState([]);
  const [id, setid] = useState(0);
  const [title, settitle] = useState(false);

  //////////////////////////////////////
  const [inputs, setInputs] = useState({});
  const [dataRender, setDataRender] = useState({});
  // const [dataApi, setDataApi] = useState({});



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("name", name)
    console.log("value", value)
    setInputs(values => ({ ...values, [name]: parseFloat(value) }))
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const studentScores = []
    for (let key in inputs) {
      if (studentScores.find((item) => (item?.studentId == key.slice(0, -2))))
        studentScores.find((item) => (item?.studentId == key.slice(0, -2))).scores.push({
          "score": parseFloat(inputs[key]),
          "type": key.slice(-2)
        })
      else studentScores.push({
        "studentId": key.slice(0, -2),
        "scores": [
          {
            "score": parseFloat(inputs[key]),

            "type": key.slice(-2)
          }]
      })
    }
    const dataUpdate = {
      "schoolYearId": 1,
      "semesterId": 1,
      "studentScores": studentScores
    }
    console.log(dataUpdate);
  }


  //////////////////////////////////////
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("rooms");
        //console.log(data);
        setlistroom(data.data.items);
        //console.log(data.data.items);
        const res = await axios.get("subjects");
        //console.log(res);
        setlistsubject(res.data.data.items);
      } catch (e) { }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("schoolyear");
        //console.log(res);
        setlistyear(res.data.data.items);
      } catch (e) { }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("classes");
        //console.log(data);
        setlistclass(data.data.items);
        const res = await axios.get("teachers");
        //console.log(res);
        setlistteacher(res.data.data.items);
      } catch (e) { }
    })();
  }, []);
  const set = async (type) => {
    const { data } = await axios.get(
      `calendars?calendarType=${type}&schoolYearId=${schoolYearId}&semesterId=${semesterId}`
    );
    //console.log(data);
    setlistCalendar(data.data.items);
  };
  const MOCK_DATA = {
    "clazz": {
      "classId": 1,
      "className": "10/1"
    },
    "subject": {
      "subjectId": 3,
      "subject": "Chemistry"
    },
    "examResults": [
      {
        "student": {
          "studentId": 100,
          "lastName": "Ngô",
          "firstName": "San"
        },
        "scores": [
          {
            "score": 7.0,
            "type": "A1"
          },
          {
            "score": 8.0,
            "type": "B2"
          }
        ]
      },
      {
        "student": {
          "studentId": 102,
          "lastName": "Nguyễn",
          "firstName": "Huấn"
        },
        "scores": [
          {
            "score": 8.0,
            "type": "A1"
          },
          {
            "score": 10.0,
            "type": "C1"
          }
        ]
      },
      {
        "student": {
          "studentId": 104,
          "lastName": "Nguyễn Hữu",
          "firstName": "Hậu"
        },
        "scores": []
      }
    ]
  }
  useEffect(() => {

    const tempInputs = {}
    MOCK_DATA.examResults.forEach(element => {
      element.scores.forEach(element2 => {
        tempInputs[`${element.student.studentId}${element2.type}`] = element2.score
      })
    });
    setInputs(tempInputs)
  }, []);
  return (
    <>
      {console.log(inputs)}

      <div style={{ height: "60%", width: "100%", padding: "5px 2px 2px 2px" }}>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <table className="table table-dark" style={{ border: "0" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "15%" }}>
                  <CFormSelect
                    onChange={(e) => setschoolYearId(e.target.value)}
                  >
                    <option>Năm học</option>
                    {listyear?.map((item) => (
                      <option
                        key={item.schoolYearId}
                        value={item.schoolYearId}
                        label={item.schoolYear}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "7%" }}>Học kì:</td>
                <td style={{ textAlign: "center", width: "10%" }}>
                  <CFormSelect onChange={(e) => setsemesterId(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "center", width: "5%" }}>Lịch:</td>
                <td style={{ textAlign: "center", width: "15%" }}>
                  <CFormSelect onChange={(e) => set(e.target.value)}>
                    <option>Loại lịch</option>
                    <option value="Meeting">Lịch họp</option>
                    <option value="Examination">Lịch thi</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "end" }}>
                  <CButton
                    onClick={(e) => {
                      settitle(true);
                      setVisible(true);
                      setuserIds([]);
                      setclassIds([]);
                      setcalendarEventName("");
                      setsubjectId(0);
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
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td rowspan="2" >STT</td>
              <td rowspan="2">Họ và tên</td>
              <td colspan="8" >Hệ số 1</td>

              <td colspan="4" >Hệ số 2</td>
              <td rowspan="2" >Thi HK</td>
              <td rowspan="2" >ĐTB môn</td>
              <td rowspan="2">XLHK1</td>
            </tr>
            <tr >
              <td colspan="3" >Miệng </td>
              <td colspan="4" >15 phút</td>
              <td >TH</td>
              <td colspan="4" >1 tiết</td>
            </tr>
            {/* {MOCK_DATA.examResults.map((item, index) =>
            ( 
              <tr>
                <td>{index}</td>
                <td>{`${item.student.lastName} ${item.student.firstName}`}</td>
                {item.scores.filter((score) => score.type == "Type I").map((score) => (<td>{score.score}</td>))}
                <td>{ }</td>


              </tr>)
            )} */}
            {MOCK_DATA.examResults.map((item, index) =>
            (
              <tr>

                <td>{index}</td>
                <td>{`${item.student.lastName} ${item.student.firstName}`}</td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}A1`}
                    value={inputs[`${item.student.studentId}A1`] || ""}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}A2`}
                    value={inputs[`${item.student.studentId}A2`] || ""}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}A3`}
                    value={inputs[`${item.student.studentId}A3`] || ""}
                    onChange={handleChange}
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B1`}
                    value={inputs[`${item.student.studentId}B1`] || ""}
                    onChange={handleChange}
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B2`}
                    value={inputs[`${item.student.studentId}B2`] || ""}
                    onChange={handleChange}
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B3`}
                    value={inputs[`${item.student.studentId}B3`] || ""}
                    onChange={handleChange}
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B4`}
                    value={inputs[`${item.student.studentId}B4`] || ""}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}C1`}
                    value={inputs[`${item.student.studentId}C1`] || ""}
                    onChange={handleChange}
                    style={{ height: "60%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D1`}
                    value={inputs[`${item.student.studentId}D1`] || ""}
                    onChange={handleChange}
                    style={{ height: "100%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D2`}
                    value={inputs[`${item.student.studentId}D2`] || ""}
                    onChange={handleChange}
                    style={{ height: "100%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D3`}
                    value={inputs[`${item.student.studentId}D3`] || ""}
                    onChange={handleChange}
                    style={{ height: "100%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D4`}
                    value={inputs[`${item.student.studentId}D4`] || ""}
                    onChange={handleChange}
                    style={{ height: "100%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}E1`}
                    value={inputs[`${item.student.studentId}E1`] || ""}
                    onChange={handleChange}
                    style={{ height: "100%", width: "35px", padding: "5px 2px 2px 2px" }}
                    min="0"
                    max="10"
                  />
                </td>
                <td></td>
                <td></td>

              </tr>)
            )}
          </tbody>
        </table>
        <input type="submit" />
      </form>
      <button onClick={() => console.log(inputs)}>console.log</button>

    </>
  );
};
