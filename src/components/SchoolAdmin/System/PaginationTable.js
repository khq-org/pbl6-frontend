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
  const [listteacher, setlistteacher] = useState([]);
  const [listclass1, setlistclass1] = useState([]);
  const [listclass2, setlistclass2] = useState([]);
  const [listclass3, setlistclass3] = useState([]);
  const [oldSchoolYearId, setoldSchoolYearId] = useState(1);
  const [newSchoolYearId, setnewSchoolYearId] = useState(0);
  const [newSchoolYear, setnewSchoolYear] = useState("");
  const [oldClassIds, setoldClassIds] = useState([]);
  const [newClassIds, setnewClassIds] = useState([]);
  const [teacherIds, setteacherIds] = useState([]);
  const [status, setstatus] = useState(false);
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
        setlistclass3(
          data.data.items.filter((item) => item.grade.gradeId === 1)
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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("teachers");

        setlistteacher(res.data.data.items);
      } catch (e) {}
    })();
  }, []);

  const createNewyear = async (e) => {
    e.preventDefault();

    const res = await axios.post("schoolyear", {
      schoolYearName,
    });
    //console.log(res);
    if (res.response?.status === 400) {
      setmessenger("Gi?? tr??? kh??ng h???p l???.");
    } else if (res.status === 200) {
      setnewSchoolYearId(res.data.data.id);
      setnewSchoolYear(res.data.data.name);

      setstatus(true);
      // setlistyear([
      //   ...listyear,
      //   {
      //     schoolYearId: res.data.data.id,
      //     schoolYear: res.data.data.name,
      //   },
      // ]);
      setmessenger("");
      setVisible(false);
      window.alert("???? th??m n??m h???c m???i.");
    }

    console.log(res);
  };
  const save = async (e) => {
    e.preventDefault();

    if (status) {
      if (
        window.confirm(
          `B???n ch???c ch???n mu???n k???t chuy???n d??? li???u ?????n n??m ${newSchoolYear}`
        )
      ) {
        const res = await axios.post("schoolyear/startNewSchoolYear", {
          oldSchoolYearId,
          newSchoolYearId,
          oldClassIds,
          newClassIds,
          teacherIds,
        });
        if (res.status === 200) {
          window.alert("Th??nh c??ng.");
        } else {
          window.alert("Th???t b???i. Ki???m tra l???i.");
        }
        console.log(newSchoolYearId);
        console.log("old", oldClassIds);
        console.log("new", newClassIds);
        console.log("teacher", teacherIds);
      }
    } else {
      alert("B???n c???n t???o n??m h???c m???i");
      setVisible(true);
    }
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
            <h2>Th??m n??m h???c m???i</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={createNewyear}>
            <div className="col">
              <div className="">
                <div className="row mt-3">
                  <div className="col-md-12">
                    T??n n??m h???c
                    <input
                      type="tel"
                      pattern="[0-9]{4}-[0-9]{4}"
                      className="form-control"
                      placeholder="yyyy-yyyy"
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
                    Th??m m???i
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CModalBody>
      </CModal>
      <div className="container rounded bg-white mt-0 mb-0">
        <form className="row mx-5" onSubmit={save}>
          <div className="text-end mb-3">
            <CButton
              className="btn btn-primary"
              type="button"
              onClick={() => setVisible(!visible)}
            >
              Th??m m???i n??m h???c
            </CButton>
          </div>
          <table>
            <tr>
              <th>STT</th>
              <th>T??n l???p n??m c??</th>
              <th>T??n l???p chuy???n ?????n</th>
              <th>Gi??o vi??n ch??? nhi???m(L???p m???i)</th>
            </tr>
            {listclass3?.map((i, index) => (
              <tr className="text-center">
                <td>{index}</td>
                <td></td>
                <td>{i.clazz}</td>
                <td>
                  <CFormSelect
                    onChange={(e) => {
                      teacherIds[index] = Number(e.target.value);
                    }}
                  >
                    <option>GVCN</option>
                    {listteacher?.map((item, index2) => (
                      <option value={item.userId}>{item.displayName}</option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
            ))}
            {listclass1?.map((item, index) => (
              <tr className="text-center">
                <td>{index + 3}</td>
                <td>{item.clazz}</td>
                <td>
                  <CFormSelect
                    onChange={(e) => {
                      newClassIds[index] = Number(e.target.value);
                    }}
                  >
                    <option>L???p</option>
                    {listclass2?.map((item2, index2) => (
                      <option value={item2.classId}>{item2.clazz}</option>
                    ))}
                  </CFormSelect>
                </td>
                <td>
                  <CFormSelect
                    onChange={(e) => {
                      teacherIds[index + 3] = Number(e.target.value);
                    }}
                  >
                    <option>GVCN</option>
                    {listteacher?.map((item3, index3) => (
                      <option value={item3.userId}>{item3.displayName}</option>
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
              K???t chuy???n d??? li???u t??? n??m h???c
            </CButton>
            <CFormSelect
              style={{ width: "200px" }}
              onChange={(e) => {
                setnewSchoolYearId(e.target.value);
              }}
            >
              <option>N??m h???c c??</option>
              {listyear.map((item) => (
                <option
                  value={item.schoolYearId}
                  label={item.schoolYear}
                ></option>
              ))}
            </CFormSelect>
            ?????n
            <input type="text" value={newSchoolYear} />
          </div>
        </form>
      </div>
    </>
  );
};
