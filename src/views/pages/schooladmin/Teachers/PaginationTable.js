import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import CITY from "../../vn/CITY.json";
import DISTRICT from "../../vn/DISTRICT.json";

import { COLUMNS } from "./columns";
import "./table.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
} from "@coreui/react";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listTeacher, setlistTeacher] = useState([]);
  const [visible, setVisible] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState(true);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [placeOfBirth, setplaceOfBirth] = useState("");
  const [workingPosition, setworkingPosition] = useState("");
  const [nationality, setnationality] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setlistcity(CITY);
        setlistdistrict(DISTRICT);
      } catch (e) {}
    })();
  }, []);

  const setadd = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcity(c.name);

    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrict(d);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("teachers");
        //console.log({ data });
        setlistTeacher(data.data.items);
      } catch (e) {}
    })();
  }, []);
  const create = async (e) => {
    e.preventDefault();
    const res = await axios.post("teachers", {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      phone,
      email,
      street,
      district,
      city,
      nationality,
      workingPosition,
    });
    console.log(res);
    window.location.reload();
    //alert("done.");
  };
  const del = async (id) => {
    const res = await axios.delete(`teachers/${id}`);
    console.log(res);
    setlistTeacher(listTeacher.filter((item) => item.userId !== id));
  };

  const data = useMemo(() => listTeacher, [listTeacher]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Thêm mới giáo viên</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col">
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    Họ
                    <input
                      type="text"
                      className="form-control"
                      placeholder="họ"
                      onChange={(e) => setlastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    Tên
                    <input
                      type="text"
                      className="form-control"
                      placeholder="tên"
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    Ngày Sinh
                    <input
                      type="date"
                      className="form-control"
                      placeholder="ngày sinh"
                      onChange={(e) =>
                        setdateOfBirth(e.target.value.toString())
                      }
                    />
                  </div>
                  <div className="col-md-12">
                    Giới tính
                    <CFormSelect onChange={(e) => setgender(e.target.value)}>
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Quê quán
                    <input
                      type="text"
                      className="form-control"
                      placeholder="quê quán"
                      onChange={(e) => setplaceOfBirth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    Địa chỉ
                    <input
                      type="text"
                      className="form-control"
                      placeholder="số nhà/thôn xóm, xã/phường/thị trấn"
                      onChange={(e) => setstreet(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    Quận/Huyện
                    <CFormSelect onChange={(e) => setdistrict(e.target.value)}>
                      {listdistrict.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Tỉnh/Thành phố
                    <CFormSelect onChange={(e) => setadd(e.target.value)}>
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Số điện thoại
                    <input
                      type="text"
                      className="form-control"
                      placeholder="sdt"
                      onChange={(e) => setphone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    Email
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email"
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    Quốc tịch
                    <input
                      type="text"
                      className="form-control"
                      placeholder="quốc tịch"
                      onChange={(e) => setnationality(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    Chức vụ
                    <input
                      type="text"
                      className="form-control"
                      placeholder="chức vụ"
                      onChange={(e) => setworkingPosition(e.target.value)}
                      required
                    />
                  </div>
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <form className="form-inline ">
          <input
            className="form-control form-control-sm mr-3 w-75"
            type="text"
            placeholder="Tìm kiếm"
            aria-label="Search"
          />
          <button className="material-icons">search</button>
        </form>
        <CButton
          className="btn btn-primary"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          Thêm mới
        </CButton>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Hành động</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <Link
                    to={`${row.original.userId}`}
                    className="edit"
                    title="Sửa"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE254;</i>
                  </Link>
                  <Link
                    onClick={() => del(row.original.userId)}
                    className="delete"
                    title="Xóa"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE872;</i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Trước
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Sau
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Trang{" "}
          <strong>
            {pageIndex + 1} / {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Tới trang:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Xem {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};