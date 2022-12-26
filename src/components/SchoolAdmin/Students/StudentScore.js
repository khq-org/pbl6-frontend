import React from "react";
import "./table.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const StudentScore = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [student, setstudent] = useState();
  const [listlearningResults, setlistlearningResults] = useState([]);
  const [learningResults, setlearningResults] = useState([]);
  const [inputs1, setInputs1] = useState({});
  const [semester, setsemester] = useState(0);
  const [school, setschool] = useState(0);

  const { id } = useParams();
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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`students/profile?studentId=${id}`);
        console.log({ data });
        setstudent(data.data.student);
        setlistlearningResults(data.data.learningResults);
      } catch (e) {}
    })();
  }, []);
  const handlesetlearningResults = async (id, sem) => {
    const { data } = await axios.get(`learningresults/${id}`);
    setlearningResults(data.data);

    console.log(data.data);

    const tempInputs1 = {};
    data.data.studyScores.forEach((element) => {
      element.semesterScores[Number(sem)].scores.forEach((element2) => {
        tempInputs1[`${element.subject.subjectId}${element2.type}`] =
          element2.score;
      });
    });
    console.log(tempInputs1);
    setInputs1(tempInputs1);
  };

  return (
    <>
      <div className=" rounded bg-white mt-0 mb-0">
        <div className="table">
          <tr>
            <td style={{ width: "70%" }}>
              <b>KẾT QUẢ HỌC TẬP</b>
            </td>
            <td>
              <CFormSelect
                onChange={(e) => {
                  handlesetlearningResults(e.target.value, semester);
                  setschool(Number(e.target.value));
                }}
                style={{ width: "200px" }}
              >
                <option>Năm học</option>
                {listlearningResults?.map((item) => (
                  <option
                    key={item.learningResultId}
                    value={item.learningResultId}
                  >
                    {item.schoolYear}
                  </option>
                ))}
              </CFormSelect>
            </td>
            <td>
              <CFormSelect
                style={{ width: "200px" }}
                onChange={(e) => {
                  handlesetlearningResults(school, e.target.value);
                  setsemester(Number(e.target.value));
                }}
              >
                <option value={0}> Học kì I</option>
                <option value={1}> Học kì II</option>
              </CFormSelect>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                Học sinh: {student?.lastName} {student?.firstName}{" "}
              </b>
              <b> Ngày sinh: </b>
              {student?.dayOfBirth}
              <div>
                <b>Lớp: {learningResults?.learningResult?.className} </b>
              </div>
            </td>
          </tr>
        </div>

        <div>
          <table className="table table-bordered text-center">
            <tbody>
              <tr style={{ backgroundColor: "silver" }}>
                <td rowspan="2">STT</td>
                <td rowspan="2">Môn học</td>
                <td colspan="8">Hệ số 1</td>

                <td colspan="4">Hệ số 2</td>
                <td rowspan="2">Thi HK</td>
                <td rowspan="2">Điểm trung bình</td>
              </tr>
              <tr style={{ backgroundColor: "silver" }}>
                <td colspan="3">Miệng </td>
                <td colspan="4">15 phút</td>
                <td>TH</td>
                <td colspan="4">1 tiết</td>
              </tr>

              {learningResults.studyScores?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {mapSubjects[item.subject.subjectName.replace(" ", "_")]}
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}A1`}
                      value={inputs1[`${item.subject.subjectId}A1`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}A2`}
                      value={inputs1[`${item.subject.subjectId}A2`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}A3`}
                      value={inputs1[`${item.subject.subjectId}A3`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}B1`}
                      value={inputs1[`${item.subject.subjectId}B1`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}B2`}
                      value={inputs1[`${item.subject.subjectId}B2`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}B3`}
                      value={inputs1[`${item.subject.subjectId}B3`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}B4`}
                      value={inputs1[`${item.subject.subjectId}B4`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}C1`}
                      value={inputs1[`${item.subject.subjectId}C1`] || ""}
                      style={{
                        height: "60%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}D1`}
                      value={inputs1[`${item.subject.subjectId}D1`] || ""}
                      style={{
                        height: "100%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}D2`}
                      value={inputs1[`${item.subject.subjectId}D2`] || ""}
                      style={{
                        height: "100%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}D3`}
                      value={inputs1[`${item.subject.subjectId}D3`] || ""}
                      style={{
                        height: "100%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}D4`}
                      value={inputs1[`${item.subject.subjectId}D4`] || ""}
                      style={{
                        height: "100%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      name={`${item.subject.subjectId}E1`}
                      value={inputs1[`${item.subject.subjectId}E1`] || ""}
                      style={{
                        height: "100%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly
                      value={item.semesterScores[
                        Number(semester)
                      ]?.avgScore.toFixed(2)}
                      style={{
                        height: "100%",
                        width: "40px",
                        padding: "5px 2px 2px 2px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentScore;
