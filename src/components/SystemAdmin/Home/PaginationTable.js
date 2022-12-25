import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { CAlert } from "@coreui/react";
import { Link } from "react-router-dom";

import { COLUMNS } from "./columns";

import axios from "axios";
import { useState, useEffect } from "react";

import { GlobalFilter } from "./GlobalFilter";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [listschool, setListschool] = useState([]);
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [visible, setVisible] = useState(false);

  const del = async (id) => {
    if (window.confirm("Bạn muốn xóa thông tin trường học này?")) {
      const res = await axios.delete(`schools/${id}`);
      //console.log(res);
      if (res.status === 200) {
        setListschool(listschool.filter((item) => item.schoolId !== id));
        //window.location.reload();
        setVisible(true);
      } else {
        window.alert("Thất bại.");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schools");
        //console.log({ data });
        setListschool(data.data.items);
      } catch (e) {}
    })();
  }, []);

  const data = useMemo(() => listschool, [listschool]);
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

  return (
    <>
      <CAlert
        className="alert"
        color="primary"
        dismissible
        visible={visible}
        onClose={() => setVisible(false)}
      >
        Đã xóa!
      </CAlert>
      <div className="container rounded bg-white mt-0 mb-0">
        <div className="main" style={{ width: "100%" }}>
          <div className="table-title mt-3">
            <div className="row">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />
                <Link to="create">
                  <button className="btn btn-primary" type="button">
                    Thêm mới
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <table
            className="table table-bordered "
            style={{ width: "100%" }}
            {...getTableProps()}
          >
            <thead style={{ background: "#ddd", color: "#4985B2" }}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th>STT</th>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
                  <th>Actions</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    <td>{index + 1}</td>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                    <td>
                      <Link
                        to={`schooldetail/${row.original.schoolId}`}
                        className="edit"
                        title="Sửa"
                        cshools-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE254;</i>
                      </Link>
                      <Link
                        onClick={() => del(row.original.schoolId)}
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
              Previous
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} / {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
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
              {[5, 10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
