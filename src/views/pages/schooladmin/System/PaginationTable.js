import React, { useMemo } from "react";
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
import { Link } from "react-router-dom";
export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [visible, setVisible] = useState(false);
  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [clazz, setclazz] = useState(1);
  const [schoolyear, setschoolyear] = useState(1);
  var newListClass = [];
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        console.log(data);
        setlistyear(data.data.items);
        const res = await axios.get("classes?schoolYearId=1");
        setlistclass(res.data.data.items);
        console.log("newListClass");
        const len = res.data.data.items.length;
        console.log(len);
        newListClass = new Array(len).fill(res.data.data.items[0].classId);
        console.log(newListClass);

      } catch (e) { }
    })();
  }, []);

  const setcl = async (year) => {
    const res = await axios.get(`classes?schoolYearId=${year}`);
    console.log(res);
    setlistclass(res.data.data.items);
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        Năm học:
        <CFormSelect
          disabled
          className="form-control form-control-sm mr-3 w-25"
          onChange={(e) => {
            setschoolyear(e.target.value);
            setcl(e.target.value);
          }}
        >
          {listyear?.map((item) => (
            <option value={item.schoolYearId} label={item.schoolYear}></option>
          ))}
        </CFormSelect>


        <Link to="student">
          <CButton className="btn btn-primary" type="button">
            Thêm mới năm học
          </CButton>
        </Link>
      </div>

      <table>
        <tr>
          <th>STT</th>
          <th>Tên lớp năm cũ</th>
          <th>Tên lớp chuyển đến</th>
        </tr>
        {listclass?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.clazz}</td>
            <td>
              <CFormSelect
                className="form-control form-control-sm mr-3 w-25"
              >
                {listclass?.map((items) => (
                  <option value={items.classId} label={items.clazz}></option>
                ))}
              </CFormSelect>
            </td>


          </tr>

        ))}
      </table>



    </>
  );
};
