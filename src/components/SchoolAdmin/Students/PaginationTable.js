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
import { GlobalFilter } from "./../GlobalFilter";

import { Link } from "react-router-dom";
export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listStudent, setlistStudent] = useState([]);

  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [clazz, setclazz] = useState(1);
  const [schoolyear, setschoolyear] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        console.log(data);
        setlistyear(data.data.items);
        //const res = await axios.get("classes?schoolYearId=1");
        const res = await axios.get("classes");
        setlistclass(res.data.data.items);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("students?schoolYearId=1&classId=1");
        //console.log({ data });
        setlistStudent(data.data.items);
      } catch (e) {}
    })();
  }, []);

  const data = useMemo(() => listStudent, [listStudent]);

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

    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const show = async (year, cl) => {
    const res = await axios.get(`students?schoolYearId=${year}&classId=${cl}`);
    console.log(res);
    setlistStudent(res.data.data.items);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Bạn muốn xóa học sinh này khỏi hệ thống?")) {
      const res = await axios.delete(`students/${id}`);
      console.log(res);
      setlistStudent(listStudent.filter((item) => item.userId !== id));
    }
  };

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <span className="mt-1">Năm học:</span>
        <CFormSelect
          style={{ width: "200px" }}
          onChange={(e) => {
            setschoolyear(e.target.value);
            //setcl(e.target.value);
            show(e.target.value, clazz);
          }}
        >
          {listyear?.map((item) => (
            <option value={item.schoolYearId} label={item.schoolYear}></option>
          ))}
        </CFormSelect>
        <span className="mt-1">Lớp:</span>
        <CFormSelect
          style={{ width: "200px" }}
          onChange={(e) => {
            setclazz(e.target.value);
            show(schoolyear, e.target.value);
          }}
        >
          {listclass?.map((items) => (
            <option value={items.classId} label={items.clazz}></option>
          ))}
        </CFormSelect>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Link to="student">
          <CButton className="btn btn-primary" type="button">
            Thêm mới
          </CButton>
        </Link>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}

                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>

                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </th>
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
                  <CDropdown>
                    <CDropdownToggle color="white"></CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>
                        <Link to={`/all-students/score/${row.original.userId}`}>
                          Xem kết quả học tập
                        </Link>
                      </CDropdownItem>
                      <CDropdownItem>
                        <Link to={`/all-students/${row.original.userId}`}>
                          Hồ sơ học sinh
                        </Link>
                      </CDropdownItem>
                      <CDropdownItem>
                        <Link
                          onClick={(e) => handleDelete(row.original.userId)}
                        >
                          Xóa
                        </Link>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
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
