import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";

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
} from "@coreui/react";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listTeacher, setlistTeacher] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("teachers");
        //console.log({ data });
        setlistTeacher(data.data.items);
      } catch (e) {}
    })();
  }, []);

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

  let navigate = useNavigate();
  const create = () => {
    navigate("/teachers/all-teachers");
  };
  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Create account schooladmin</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col-md-12">
              <b>First Name</b>
              <input
                type="text"
                className="form-control"
                placeholder="first name"
                //onChange={(e) => setfirstName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <b>Last Name</b>
              <input
                type="text"
                className="form-control"
                placeholder="last name"
                //onChange={(e) => setlastName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <b>Email</b>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                //onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary " type="submit">
                Create
              </button>
            </div>
          </form>
        </CModalBody>
      </CModal>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                  <Link className="edit" title="Sửa" cshools-toggle="tooltip">
                    <i className="material-icons">&#xE254;</i>
                  </Link>
                  <Link
                    onClick={() => console.log(row.original.userId)}
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
