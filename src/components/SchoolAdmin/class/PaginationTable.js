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
import { GlobalFilter } from "./../GlobalFilter";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [className, setclassName] = useState("");
  const [gradeId, setgradeId] = useState(1);
  const [isSpecializedClass, setisSpecializedClass] = useState(false);
  const [subject, setsubject] = useState("");

  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistTeacher] = useState([]);
  const [liststudent, setliststudent] = useState([]);
  const [clazz, setclazz] = useState("");
  const [schoolyear, setschoolyear] = useState(1);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [messenger, setmessenger] = useState("");
  useEffect(() => {
    (async () => {
      try {
        //const { data } = await axios.get("classes?schoolYearId=1");
        const { data } = await axios.get("classes");
        setlistclass(data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        //console.log({ data });
        setlistyear(data.data.items);
        const res = await axios.get("teachers");
        setlistTeacher(res.data.data.items);
        //console.log({ res });
      } catch (e) {}
    })();
  }, []);
  const create = async (e) => {
    e.preventDefault();
    const response = await axios.post("classes", {
      className,
      gradeId,
      isSpecializedClass,
      subject,
    });
    if (response.status === 200) {
      alert("Th??nh c??ng.");
      setVisible(false);
      setmessenger("");
      setlistclass([
        ...listclass,
        {
          classId: response.data.data.id,
          clazz: className,
          grade: { gradeId, grade: `Grade ${Number(9) + Number(gradeId)}` },
          gradeId,
          isSpecializedClass,
          subject,
        },
      ]);
    } else {
      alert("Th???t b???i.");
      //console.log(response.response.data.errorDTOs);
      setmessenger(
        `L???i: ${response.response.data.errorDTOs[0].key}: ${response.response.data.errorDTOs[0].value}`
      );
    }

    //window.location.reload();
    //alert("done.");
  };
  const del = async (id) => {
    if (window.confirm("B???n mu???n x??a l???p n??y?")) {
      const res = await axios.delete(`classes/${id}`);
      if (res.status === 200) {
        setlistclass(listclass.filter((item) => item.classId !== id));
        window.alert("???? x??a.");
      } else {
        window.alert("Th???t b???i.");
      }
      //console.log(res);
    }
  };

  const data = useMemo(() => listclass, [listclass]);
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
      `students?schoolYearId=${schoolyear}&classId=${classid}`
    );
    setliststudent(res.data.data.items);
    //console.log({ res });
    //setVisible2(true);
  };
  const getlistclassbyyear = async (id) => {
    const res = await axios.get(`classes?schoolYearId=${id}`);
    setlistclass(res.data.data.items);
    //console.log({ res });
    //setVisible2(true);
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
            <h2>Th??m m???i l???p</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col">
              <div className="">
                <div className="row mt-3">
                  <div className="col-md-12">
                    T??n l???p
                    <input
                      type="text"
                      className="form-control"
                      placeholder="t??n l???p"
                      onChange={(e) => setclassName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    Kh???i
                    <CFormSelect onChange={(e) => setgradeId(e.target.value)}>
                      <option value={1} label="10"></option>
                      <option value={2} label="11"></option>
                      <option value={3} label="12"></option>
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Lo???i l???p
                    <CFormSelect
                      onChange={(e) => setisSpecializedClass(e.target.value)}
                    >
                      <option value={true} label="L???p ch???n"></option>
                      <option value={false} label="L???p b??nh th?????ng"></option>
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    M??n h???c chuy??n
                    <CFormSelect onChange={(e) => setsubject(e.target.value)}>
                      <option value="">Kh??ng chuy??n</option>
                      <option value="To??n">To??n</option>
                      <option value="V??n h???c">V??n h???c</option>
                      <option value="Ti???ng Anh">Ti???ng Anh</option>
                      <option value="V???t l??">V???t l??</option>
                      <option value="H??a h???c">H??a h???c</option>
                      <option value="Sinh h???c">Sinh h???c</option>
                      <option value="L???ch s???">L???ch s???</option>
                      <option value="?????a l??">?????a l??</option>
                      <option value="Tin h???c">Tin h???c</option>
                    </CFormSelect>
                  </div>
                  {/* <div className="col-md-12">
                    Gi??o vi??n ch??? nhi???m
                    <CFormSelect>
                      {listteacher.map((item) => (
                        <option
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </div> */}
                </div>
                <div className="text-end" style={{ color: "red" }}>
                  {" "}
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

      <CModal
        size="xl"
        alignment="center"
        visible={visible2}
        onClose={() => setVisible2(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Danh s??ch h???c sinh l???p {clazz}</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>H??? t??n</th>
                <th>Ng??y sinh </th>
                <th>Gi???i t??nh</th>
                <th>S??? nh??</th>
                <th>Qu???n/Huy???n</th>
                <th>T???nh/Th??nh ph???</th>
                <th>Li??n l???c</th>
              </tr>
            </thead>
            <tbody>
              {liststudent.map((item) => (
                <tr key={item.userId}>
                  <td>{item.userId}</td>
                  <td>{item.displayName}</td>
                  <td>{item.dateOfBirth}</td>
                  <td>{item.gender ? "Nam" : "N???"}</td>
                  <td>{item.street}</td>
                  <td>{item.district}</td>
                  <td>{item.city}</td>
                  <td> {item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CModalBody>
      </CModal>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <CFormSelect
          style={{ width: "200px" }}
          onChange={(e) => {
            setschoolyear(e.target.value);
            getlistclassbyyear(e.target.value);
          }}
        >
          <option>N??m h???c</option>
          {listyear.map((item) => (
            <option value={item.schoolYearId} label={item.schoolYear}></option>
          ))}
        </CFormSelect>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <CButton
          className="btn btn-primary"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          Th??m m???i
        </CButton>
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
                        ? " ????"
                        : " ????"
                      : ""}
                  </span>

                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </th>
              ))}
              <th>H??nh ?????ng</th>
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
                    onClick={() => {
                      getliststudentbyidclass(row.original.classId);
                      setclazz(row.original.clazz);
                      setVisible2(true);
                    }}
                    className="Xem"
                    title="Xem"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons" style={{ color: "blue" }}>
                      &#xE417;
                    </i>
                  </Link>
                  <Link
                    to={`${row.original.classId}`}
                    className="edit"
                    title="S???a"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons" style={{ color: "yellow" }}>
                      &#xE254;
                    </i>
                  </Link>
                  <Link
                    onClick={() => del(row.original.classId)}
                    className="delete"
                    title="X??a"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons" style={{ color: "red" }}>
                      &#xE872;
                    </i>
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
          Tr?????c
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
          | T???i trang:{" "}
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
