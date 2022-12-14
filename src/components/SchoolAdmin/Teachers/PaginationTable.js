import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
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

import { GlobalFilter } from "./../GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

export const PaginationTable = () => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

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
  const [workingPosition, setworkingPosition] = useState("Teacher");
  const [subjectId, setsubjectId] = useState(1);
  const [nationality, setnationality] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);
  const [messenger, setmessenger] = useState("");
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
    const response = await axios.post("teachers", {
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
      subjectId,
      nationality,
      workingPosition,
    });
    //console.log(res);

    if (response.status === 200) {
      alert("Th??nh c??ng.");
      setVisible(false);
      setmessenger("");
      setlistTeacher([
        ...listTeacher,
        {
          userId: response.data.data.id,
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
          subjectId,
          nationality,
          workingPosition,
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
    if (window.confirm("B???n th???c s??? mu???n x??a gi??o vi??n n??y?")) {
      const res = await axios.delete(`teachers/${id}`);
      if (res.status === 200) {
        setlistTeacher(listTeacher.filter((item) => item.userId !== id));
        window.alert("Th??nh c??ng.");
      } else {
        window.alert("Th???t b???i.");
      }
      console.log(res);
    }
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

    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

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
            <h2>Th??m m???i gi??o vi??n</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col">
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    H???
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="h???"
                      onChange={(e) => setlastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    T??n
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="t??n"
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    Ng??y Sinh
                    <input
                      type="date"
                      className="form-control"
                      placeholder="ng??y sinh"
                      onChange={(e) =>
                        setdateOfBirth(e.target.value.toString())
                      }
                    />
                  </div>
                  <div className="col-md-12">
                    Gi???i t??nh
                    <CFormSelect onChange={(e) => setgender(e.target.value)}>
                      <option value={true}>Nam</option>
                      <option value={false}>N???</option>
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Qu?? qu??n
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="qu?? qu??n"
                      onChange={(e) => setplaceOfBirth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    ?????a ch???
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="s??? nh??/th??n x??m, x??/ph?????ng/th??? tr???n"
                      onChange={(e) => setstreet(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    Qu???n/Huy???n
                    <CFormSelect onChange={(e) => setdistrict(e.target.value)}>
                      {listdistrict.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    T???nh/Th??nh ph???
                    <CFormSelect onChange={(e) => setadd(e.target.value)}>
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    S??? ??i???n tho???i
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      className="form-control"
                      placeholder="sdt"
                      onChange={(e) => setphone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    Email
                    <input
                      type="email"
                      maxlength="100"
                      className="form-control"
                      placeholder="email"
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    Qu???c t???ch
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="qu???c t???ch"
                      onChange={(e) => setnationality(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    Gi??o vi??n b??? m??n
                    <CFormSelect
                      onChange={(e) => setsubjectId(Number(e.target.value))}
                    >
                      <option value="1">To??n</option>
                      <option value="4">V??n h???c</option>
                      <option value="8">Ti???ng Anh</option>
                      <option value="2">V???t l??</option>
                      <option value="3">H??a h???c</option>
                      <option value="7">Sinh h???c</option>
                      <option value="5">L???ch s???</option>
                      <option value="6">?????a l??</option>
                      <option value="9">Gi??o d???c c??ng d??n</option>
                      <option value="12">Th??? d???c</option>
                      <option value="11">Gi??o d???c Qu???c ph??ng- An ninh</option>
                      <option value="13">Tin h???c</option>
                      <option value="10">C??ng ngh???</option>
                    </CFormSelect>
                  </div>
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
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
              <th>STT</th>
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
                    to={`/all-teachers/${row.original.userId}`}
                    className="edit"
                    title="S???a"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons" style={{ color: "yellow" }}>
                      &#xE254;
                    </i>
                  </Link>
                  <Link
                    onClick={() => del(row.original.userId)}
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
          {[5, 10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Xem {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
