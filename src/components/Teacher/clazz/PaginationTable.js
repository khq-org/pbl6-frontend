import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

export const PaginationTable = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listclass, setlistclass] = useState([]);
  const [listclazz, setlistclazz] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [inputs, setInputs] = useState({});
  const [liststudent, setliststudent] = useState([]);

  const [schoolYearId, setschoolYearId] = useState(1);
  const [semesterId, setsemesterId] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users/classes");
        //console.log({ data });
        setlistclazz(data.data);
        //console.log({ res });
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        //console.log({ data });
        setlistyear(data.data.items);
        //console.log({ res });
      } catch (e) {}
    })();
  }, []);
  const handlesetclass = async (YearId) => {
    setlistclass(
      listclazz.filter(
        (item) =>
          item.schoolYear ===
          listyear.find((element) => {
            return element.schoolYearId === YearId;
          })?.schoolYear
      )
    );
  };

  const getliststudentbyidclass = async (classid) => {
    // const res = await axios.get(
    //   `students?schoolYearId=${schoolYearId}&classId=${classid}`
    // );
    // setliststudent(res.data.data.items);
    const res = await axios.get(
      `class/learning-result?schoolYearId=${schoolYearId}&classId=${classid}`
    );
    setliststudent(res.data.data.studentLearningResults);
    console.log({ res });
    //setVisible2(true);
    const tempInputs = {};
    res.data.data.studentLearningResults.forEach((element) => {
      tempInputs[`${element.learningResultId}cd`] = element.conduct;
      tempInputs[`${element.learningResultId}lg`] = element.learningGrade;
    });
    console.log("test", tempInputs);
    setInputs(tempInputs);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("name", name);
    console.log("value", value);
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const studentScores = [];
    for (let key in inputs) {
      if (
        studentScores?.find(
          (item) => item?.learningResultId === key.slice(0, -2)
        )
      ) {
        if (key.slice(-2) === "cd") {
          studentScores.find(
            (item) => item?.learningResultId === key.slice(0, -2)
          ).conduct = inputs[key];
        }
        if (key.slice(-2) === "lg") {
          studentScores.find(
            (item) => item?.learningResultId === key.slice(0, -2)
          ).learningGrade = inputs[key];
        }
      } else {
        if (key.slice(-2) === "cd") {
          studentScores.push({
            learningResultId: key.slice(0, -2),
            conduct: inputs[key],
            learningGrade: "",
            isPassed: true,
          });
        }
        if (key.slice(-2) === "lg") {
          studentScores.push({
            learningResultId: key.slice(0, -2),
            conduct: "",
            learningGrade: inputs[key],
            isPassed: true,
          });
        }
      }
    }
    const dataUpdate = {
      studentLearningResults: studentScores,
    };
    console.log(dataUpdate);
    const res = await axios.put("class/learning-result", dataUpdate);
    if (res.status === 200) {
      alert("Đã lưu.");
    } else {
      alert("Thất bại. Kiểm tra lại.");
    }
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CFormSelect
          style={{ width: "200px" }}
          onChange={(e) => {
            setschoolYearId(Number(e.target.value));
            handlesetclass(Number(e.target.value));
            //getlistclassbyyear(e.target.value);
          }}
        >
          <option>Năm học</option>
          {listyear.map((item) => (
            <option value={item.schoolYearId} label={item.schoolYear}></option>
          ))}
        </CFormSelect>
        <CFormSelect
          style={{ width: "200px" }}
          onChange={(e) => {
            getliststudentbyidclass(e.target.value);
          }}
        >
          <option>Lớp</option>
          {listclass.map((item) => (
            <option value={item.classId} label={item.clazz}></option>
          ))}
        </CFormSelect>
      </div>

      <table>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Toán</th>
          <th>Lí</th>
          <th>Hóa</th>
          <th>Sinh</th>
          <th>Anh</th>
          <th>Văn</th>
          <th>Sử</th>
          <th>Địa</th>
          <th>GDCD</th>
          <th>Tin</th>
          <th>QP AN</th>
          <th>CN</th>
          <th>Thể dục</th>
          <th>HKI</th>
          <th>HKII</th>
          <th>Cả năm</th>
          <th>Học lực</th>
          <th>Hạnh kiểm</th>
          <th>Lên lớp</th>
        </tr>
        {liststudent.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.displayName}</td>
            <td>{item.arrAvgSubjectScore[0]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[1]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[2]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[6]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[7]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[3]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[4]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[5]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[8]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[12]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[10]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[9]?.toFixed(2)}</td>
            <td>{item.arrAvgSubjectScore[11]?.toFixed(2)}</td>
            <td>{item.avgSemesterI?.toFixed(2)}</td>
            <td>{item.avgSemesterII?.toFixed(2)}</td>
            <td>{item.avgSchoolYear?.toFixed(2)}</td>
            <td>
              <select
                name={`${item.learningResultId}lg`}
                defaultvalue={[`${item.learningResultId}lg`]}
                onChange={handleChange}
              >
                <option>HL</option>
                <option value="Giỏi">Giỏi</option>
                <option value="Khá">Khá</option>
                <option value="TB">TB</option>
                <option value="Yếu">Yếu</option>
              </select>
            </td>
            <td>
              <select
                name={`${item.learningResultId}cd`}
                defaultvalue={[`${item.learningResultId}cd`]}
                onChange={handleChange}
              >
                <option>HK</option>
                <option value="Tốt">Tốt</option>
                <option value="Khá">Khá</option>
                <option value="TB">TB</option>
                <option value="Yếu">Yếu</option>
              </select>
            </td>
            <td>
              <input type="checkbox" checked={true} />
            </td>
          </tr>
        ))}
      </table>
      <div className="text-end mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Lưu thông tin
        </button>
      </div>
    </>
  );
};
