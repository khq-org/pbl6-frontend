import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";

import { CFormSelect } from "@coreui/react";

export const PaginationTable = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listyear, setlistyear] = useState([]);
  const [listclass, setlistclass] = useState([]);
  const [liststudent, setliststudent] = useState([]);
  const [schoolYearId, setschoolYearId] = useState(1);
  const [semesterId, setsemesterId] = useState(1);

  //////////////////////////////////////
  const [inputs, setInputs] = useState({});
  const [dataRender, setDataRender] = useState({});
  // const [dataApi, setDataApi] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    //console.log("name", name);
    //console.log("value", value);
    setInputs((values) => ({ ...values, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const studentScores = [];
    for (let key in inputs) {
      if (studentScores.find((item) => item?.studentId === key.slice(0, -2)))
        studentScores
          .find((item) => item?.studentId === key.slice(0, -2))
          .scores.push({
            score: parseFloat(inputs[key]),
            type: key.slice(-2),
          });
      else
        studentScores.push({
          studentId: key.slice(0, -2),
          scores: [
            {
              score: parseFloat(inputs[key]),

              type: key.slice(-2),
            },
          ],
        });
    }
    const dataUpdate = {
      schoolYearId,
      semesterId,
      studentScores: studentScores,
    };
    console.log(dataUpdate);
    const { data } = await axios.post("inputscores", dataUpdate);
    console.log(data);
  };

  //////////////////////////////////////

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("schoolyear");
        //console.log(res);
        setlistyear(res.data.data.items);
      } catch (e) {}
    })();
  }, []);

  const handlesetclass = async (YearId, seId) => {
    const { data } = await axios.get(
      `classes?schoolYearId=${YearId}&semesterId=${seId}`
    );
    console.log(data);

    //console.log([...new Set(data.data.items)]);
    setlistclass(data.data.items);
  };
  const handlesetstudent = async (clazzId) => {
    const { data } = await axios.get(
      `examresults/class?schoolYearId=${schoolYearId}&classId=${clazzId}&semesterId=${semesterId}`
    );
    console.log(data);
    setliststudent(data.data.examResults);
    const tempInputs = {};
    data.data.examResults.forEach((element) => {
      element.scores.forEach((element2) => {
        tempInputs[`${element.student.studentId}${element2.type}`] =
          element2.score;
      });
    });
    setInputs(tempInputs);
  };

  // const MOCK_DATA = {
  //   clazz: {
  //     classId: 1,
  //     className: "10/1",
  //   },
  //   subject: {
  //     subjectId: 3,
  //     subject: "Chemistry",
  //   },
  //   examResults: [
  //     {
  //       student: {
  //         studentId: 100,
  //         lastName: "Ngô",
  //         firstName: "San",
  //       },
  //       scores: [
  //         {
  //           score: 7.0,
  //           type: "A1",
  //         },
  //         {
  //           score: 8.0,
  //           type: "B2",
  //         },
  //       ],
  //     },
  //     {
  //       student: {
  //         studentId: 102,
  //         lastName: "Nguyễn",
  //         firstName: "Huấn",
  //       },
  //       scores: [
  //         {
  //           score: 8.0,
  //           type: "A1",
  //         },
  //         {
  //           score: 10.0,
  //           type: "C1",
  //         },
  //       ],
  //     },
  //     {
  //       student: {
  //         studentId: 104,
  //         lastName: "Nguyễn Hữu",
  //         firstName: "Hậu",
  //       },
  //       scores: [],
  //     },
  //   ],
  // };
  // useEffect(() => {
  //   const tempInputs = {};
  //   MOCK_DATA.examResults.forEach((element) => {
  //     element.scores.forEach((element2) => {
  //       tempInputs[`${element.userId}${element2.type}`] = element2.score;
  //     });
  //   });
  //   setInputs(tempInputs);
  // }, []);
  return (
    <>
      {/* {console.log(inputs)} */}

      <div style={{ height: "60%", width: "100%", padding: "5px 2px 2px 2px" }}>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <table className="table table-dark" style={{ border: "0" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "200px" }}>
                  <CFormSelect
                    onChange={(e) => {
                      setschoolYearId(Number(e.target.value));
                      handlesetclass(Number(e.target.value), semesterId);
                    }}
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

                <td style={{ textAlign: "center", width: "150px" }}>
                  <CFormSelect
                    onChange={(e) => {
                      setsemesterId(Number(e.target.value));
                      handlesetclass(schoolYearId, Number(e.target.value));
                    }}
                  >
                    <option>Học kì</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "center", width: "150px" }}>
                  <CFormSelect
                    onChange={(e) => handlesetstudent(e.target.value)}
                  >
                    <option>Lớp</option>
                    {listclass?.map((item) => (
                      <option key={item.classId} value={item.classId}>
                        {item.clazz}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr style={{ backgroundColor: "silver" }}>
              <td rowspan="2">STT</td>
              <td rowspan="2">Họ và tên</td>
              <td colspan="8">Hệ số 1</td>

              <td colspan="4">Hệ số 2</td>
              <td rowspan="2">Thi HK</td>
            </tr>
            <tr style={{ backgroundColor: "silver" }}>
              <td colspan="3">Miệng </td>
              <td colspan="4">15 phút</td>
              <td>TH</td>
              <td colspan="4">1 tiết</td>
            </tr>
            {liststudent?.map((item, index) => (
              <tr>
                <td>{index}</td>
                <td>
                  {item.student.lastName} {item.student.firstName}
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}A1`}
                    value={inputs[`${item.student.studentId}A1`] || ""}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.01"
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    step="0.01"
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}A3`}
                    value={inputs[`${item.student.studentId}A3`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B1`}
                    value={inputs[`${item.student.studentId}B1`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B2`}
                    value={inputs[`${item.student.studentId}B2`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}B3`}
                    value={inputs[`${item.student.studentId}B3`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
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
                    step="0.01"
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}C1`}
                    value={inputs[`${item.student.studentId}C1`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D1`}
                    value={inputs[`${item.student.studentId}D1`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D2`}
                    value={inputs[`${item.student.studentId}D2`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D3`}
                    value={inputs[`${item.student.studentId}D3`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}D4`}
                    value={inputs[`${item.student.studentId}D4`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}E1`}
                    value={inputs[`${item.student.studentId}E1`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </td>
              </tr>
            ))}
            {/* {MOCK_DATA.examResults.map((item, index) => (
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
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}A3`}
                    value={inputs[`${item.student.studentId}A3`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={`${item.student.studentId}C1`}
                    value={inputs[`${item.student.studentId}C1`] || ""}
                    onChange={handleChange}
                    style={{
                      height: "60%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
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
                    style={{
                      height: "100%",
                      width: "60px",
                      padding: "5px 2px 2px 2px",
                    }}
                    min="0"
                    max="10"
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <div className="text-end mt-3">
          <button className="btn btn-primary " type="submit">
            Lưu thông tin
          </button>
        </div>
      </form>
    </>
  );
};
