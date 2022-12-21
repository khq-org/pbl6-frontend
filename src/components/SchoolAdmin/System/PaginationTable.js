import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import "./table.css";

import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
} from "@coreui/react";
import { Modal } from "@coreui/coreui";

export const PaginationTable = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [visible, setVisible] = useState(true);

  const [schoolYearName, setSchoolYearName] = useState("");
  const [messenger, setmessenger] = useState("");
  const [listyear, setlistyear] = useState([]);
  const [listclass1, setlistclass1] = useState([]);
  const [listclass2, setlistclass2] = useState([]);
  const [oldSchoolYearId, setoldSchoolYearId] = useState(1);
  const [newSchoolYearId, setnewSchoolYearId] = useState(1);
  const [oldClassIds, setoldClassIds] = useState([]);
  const [newClassIds, setnewClassIds] = useState([]);
  const [teacherIds, setteacherIds] = useState([
    78, 109, 111, 110, 92, 24, 27, 107, 106,
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("classes");

        setlistclass1(
          data.data.items.filter((item) => item.grade.gradeId !== 3)
        );
        setlistclass2(
          data.data.items.filter((item) => item.grade.gradeId !== 1)
        );
        data.data.items
          .filter((item) => item.grade.gradeId !== 3)
          ?.map((item, index) => {
            oldClassIds[index] = item.classId;
          });
        // data.data.items
        //   .filter((item) => item.grade.gradeId !== 1)
        //   ?.map((item, index) => {
        //     newClassIds[index] = item.classId;
        //   });

        const res = await axios.get("schoolyear");
        //console.log({ data });
        setlistyear(res.data.data.items);
      } catch (e) {}
    })();
  }, []);

  const createNewyear = async (e) => {
    e.preventDefault();

    const res = await axios.post("schoolyear", {
      schoolYearName,
    });
    if (res.response.status === 400) {
      setmessenger("Năm học đã tồn tại trong hệ thống.");
    } else {
      setmessenger("");
      setVisible(false);
    }

    console.log(res);
  };
  const save = async (e) => {
    e.preventDefault();

    const res = await axios.post("schoolyear/startNewSchoolYear", {
      oldSchoolYearId,
      newSchoolYearId,
      oldClassIds,
      newClassIds,
      teacherIds,
    });
    if (res.status === 200) {
      window.alert("Thành công.");
    } else {
      window.alert("Thất bại. Kiểm tra lại.");
    }
    console.log(newSchoolYearId);
    console.log("old", oldClassIds);
    console.log("new", newClassIds);
  };
  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          setVisible(false);
          setmessenger("");
        }}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Thêm năm học mới</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={createNewyear}>
            <div className="col">
              <div className="">
                <div className="row mt-3">
                  <div className="col-md-12">
                    Tên năm học
                    <input
                      type="text"
                      className="form-control"
                      placeholder="y-y"
                      onChange={(e) => setSchoolYearName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="text-end" style={{ color: "red" }}>
                  {messenger}
                </div>

                <div className="mt-5 text-center">
                  <button className="btn btn-primary " type="submit">
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CModalBody>
      </CModal>
      <div className="container rounded bg-white mt-0 mb-0">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton
            className="btn btn-primary"
            type="button"
            onClick={() => setVisible(!visible)}
          >
            Thêm mới năm học
          </CButton>
        </div>

        <form className="row m-5" onSubmit={save}>
          <table>
            <tr>
              <th>STT</th>
              <th>Tên lớp năm cũ</th>
              <th>Tên lớp chuyển đến</th>
            </tr>

            {listclass1?.map((item, index) => (
              <tr>
                <td>{index}</td>
                <td>{item.clazz}</td>
                <td>
                  <CFormSelect
                    onChange={(e) => {
                      newClassIds[index] = Number(e.target.value);
                    }}
                  >
                    <option>Lớp</option>
                    {listclass2?.map((item2, index2) => (
                      <option value={item2.classId}>{item2.clazz}</option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
            ))}

            {/* <tr>
              <td>
                {listclass1?.map((item, index) => (
                  <tr>{index}</tr>
                ))}
              </td>
              <td>
                {listclass1?.map((item, index) => (
                  <tr>{item.clazz}</tr>
                ))}
              </td>
              <td>
                {listclass2?.map((item, index) => (
                  <tr>{item.clazz}</tr>
                ))}
              </td>
            </tr> */}
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
            <CButton className="btn btn-primary " type="submit">
              Kết chuyển dữ liệu đến năm học
            </CButton>
            <CFormSelect
              style={{ width: "200px" }}
              onChange={(e) => {
                setnewSchoolYearId(e.target.value);
              }}
            >
              {listyear.map((item) => (
                <option
                  value={item.schoolYearId}
                  label={item.schoolYear}
                ></option>
              ))}
            </CFormSelect>
            Đến
            <CFormSelect
              style={{ width: "200px" }}
              onChange={(e) => {
                setoldSchoolYearId(e.target.value);
              }}
            >
              {listyear.map((item) => (
                <option
                  value={item.schoolYearId}
                  label={item.schoolYear}
                ></option>
              ))}
            </CFormSelect>
          </div>
        </form>
      </div>
    </>
  );
};
