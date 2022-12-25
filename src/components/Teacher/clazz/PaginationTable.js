import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
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
  CFormSelect,
  CForm,
} from "@coreui/react";
import { GlobalFilter } from "./../../SchoolAdmin/GlobalFilter";
import { element } from "prop-types";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listclass, setlistclass] = useState([]);
  const [listclazz, setlistclazz] = useState([]);
  const [listyear, setlistyear] = useState([]);

  const [liststudent, setliststudent] = useState([]);
  const [clazz, setclazz] = useState("");
  const [schoolyear, setschoolyear] = useState(1);

  const [visible2, setVisible2] = useState(false);
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
    listyear.find((element) => {
      return element.schoolYearId === YearId;
    });
    // const { data } = await axios.get("users/classes");
    // console.log(data);

    // //console.log([...new Set(data.data.items)]);
    // setlistclass(data.data);
  };
  const data = useMemo(() => liststudent, [liststudent]);
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

  const getliststudentbyidclass = async (classid) => {
    const res = await axios.get(
      `students?schoolYearId=${schoolYearId}&classId=${classid}`
    );
    setliststudent(res.data.data.items);
    //console.log({ res });
    //setVisible2(true);
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

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
