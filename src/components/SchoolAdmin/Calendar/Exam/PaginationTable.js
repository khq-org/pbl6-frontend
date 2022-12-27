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
import { GlobalFilter } from "../../GlobalFilter";

import { Link } from "react-router-dom";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  var mapSubjects = {
    Biological: "Sinh học",
    Chemistry: "Hóa học",
    Civic_Education: "Giáo dục công dân",
    Defense_Education: "Giáo dục quốc phòng",
    English: "Tiếng Anh",
    Geographic: "Địa lý",
    History: "Lịch Sử",
    Informatics: "Tin học",
    Literature: "Ngữ văn",
    Maths: "Toán học",
    Physic: "Vật lý",
    Physical_Education: "Thể dục",
    Technology: "Công nghệ",
  };

  const [listroom, setlistroom] = useState([]);
  const [listCalendar, setlistCalendar] = useState([]);
  const [visible, setVisible] = useState(false);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistteacher] = useState([]);
  const [listclass, setlistclass] = useState([]);

  const [calendarEventName, setcalendarEventName] = useState("");
  const [calendarEventType, setcalendarEventType] = useState("Meeting");
  const [classIds, setclassIds] = useState([]);
  const [userIds, setuserIds] = useState([]);
  const [schoolYearId, setschoolYearId] = useState(1);
  const [timeStart, settimeStart] = useState("");
  const [timeFinish, settimeFinish] = useState("");
  const [semesterId, setsemesterId] = useState(1);
  const [date, setdate] = useState("");
  const [roomName, setroomName] = useState("");
  const [roomId, setroomId] = useState(1);
  const [subjectId, setsubjectId] = useState(1);
  const [listsubject, setlistsubject] = useState([]);
  const [id, setid] = useState(0);
  const [title, settitle] = useState(false);
  const [messenger, setmessenger] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("rooms");
        //console.log(data);
        setlistroom(data.data.items);
        //console.log(data.data.items);
        const res = await axios.get("subjects");
        //console.log(res);
        setlistsubject(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("schoolyear");
        //console.log(res);
        setlistyear(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("classes");
        //console.log(data);
        setlistclass(data.data.items);
        const res = await axios.get("teachers");
        //console.log(res);
        setlistteacher(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  const set = async (type) => {
    const { data } = await axios.get(
      `calendars?calendarEventType=${type}&schoolYearId=${schoolYearId}&semesterId=${semesterId}`
    );
    //console.log(data);
    setlistCalendar(data.data.items);
    setcalendarEventType(type);
  };

  const data = useMemo(() => listCalendar, [listCalendar]);

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

  const save = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        const response = await axios.post("calendars", {
          calendarEventName,
          calendarEventType,
          classIds,
          userIds,
          timeStart,
          timeFinish,
          roomId,
          schoolYearId,
          subjectId,
          semesterId,
          date,
        });

        if (response.status === 200) {
          alert("Thành công.");
          setVisible(false);
          setmessenger("");

          set(calendarEventType);
        } else {
          alert("Thất bại.");
          //console.log(response.response.data.errorDTOs);
          if (response.response.data.errorDTOs[0].key === "date") {
            setmessenger("Ngày không hợp lệ");
          }
          if (response.response.data.errorDTOs[0].value === "DUPLICATE_TIME") {
            setmessenger(
              `${response.response.data.errorDTOs[0].key}: Trùng lịch.`
            );
          }
          if (
            response.response.data.errorDTOs[0].value === "DUPLICATE_LESSON"
          ) {
            setmessenger(
              `${response.response.data.errorDTOs[0].key}: Trùng lịch.`
            );
          }
          if (response.response.data.errorDTOs[0].key === "roomId") {
            setmessenger("Trong thời gian trên, Phòng này đã được sử dụng.");
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        const response = await axios.put(`calendars/${id}`, {
          calendarEventName,
          calendarEventType,
          classIds,
          userIds,
          timeStart,
          timeFinish,
          roomId,
          schoolYearId,
          subjectId,
          semesterId,
          date,
        });
        //console.log("res", { response });
        if (response.status === 200) {
          alert("Thành công.");
          setVisible(false);
          setmessenger("");

          set(calendarEventType);
        } else {
          alert("Thất bại.");
          //console.log(response.response.data.errorDTOs);

          if (response.response.data.errorDTOs[0].key === "date") {
            setmessenger("Ngày không hợp lệ");
          }
          if (response.response.data.errorDTOs[0].value === "DUPLICATE_TIME") {
            setmessenger(
              `${response.response.data.errorDTOs[0].key}: Trùng lịch.`
            );
          }
          if (
            response.response.data.errorDTOs[0].value === "DUPLICATE_LESSON"
          ) {
            setmessenger(
              `${response.response.data.errorDTOs[0].key}: Trùng lịch.`
            );
          }
          if (response.response.data.errorDTOs[0].key === "roomId") {
            setmessenger("Trong thời gian trên, Phòng này đã được sử dụng.");
          }
        }
      } catch (error) {}
    }
  };
  const del = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch này?")) {
      const res = await axios.delete(`calendars/${id}`);
      if (res.status === 200) {
        setlistCalendar(
          listCalendar.filter((item) => item.calendarEventId !== id)
        );
        window.alert("Đã xóa.");
      } else {
        window.alert("Thất bại.");
      }
      //console.log(data);
    }
  };
  const update = async (id) => {
    setid(id);
    settitle(false);
    const { data } = await axios.get(`calendars/${id}`);
    //console.log(data);
    setcalendarEventName(data.data.calendarEvent?.calendarEvent);
    setcalendarEventType(data.data.calendarEvent?.calendarEventType);

    setsubjectId(
      listsubject.find((item) => {
        return item.subject === data.data.calendarEvent?.subjectName;
      })?.subjectId
    );
    settimeFinish(data.data.calendarEvent.timeFinish);
    settimeStart(data.data.calendarEvent.timeStart);
    setdate(data.data.calendarEvent.calendarDate);
    setroomName(data.data.calendarEvent.roomName);
    setroomId(
      listroom?.find((element) => {
        return element.room === data.data.calendarEvent.roomName;
      })?.roomId
    );
    // for (let i = 0; i < data.data.users?.length; i++) {
    //   setuserIds(userIds.concat([Number(data.data.users[i].userId)]));
    // }

    data.data.users?.map((item) => {
      //setuserIds(...userIds, [Number(item.userId)]);
      userIds[userIds.length] = item.userId;
    });
    data.data.classes?.map((item) => {
      //setuserIds(...userIds, [Number(item.userId)]);
      classIds[classIds.length] = item.clazzId;
    });
    setclassIds(classIds);
    setuserIds(userIds);
    //setclassIds(data.data.classIds);
    setVisible(true);
    settitle(false);
  };
  //console.log(userIds);
  return (
    <>
      <CModal
        alignment="center"
        size="lg"
        visible={visible}
        onClose={() => {
          setVisible(false);
          setuserIds([]);
          setclassIds([]);
          setmessenger("");
        }}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>{title ? <div>Thêm lịch</div> : <div>Chỉnh sửa lịch</div>}</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={save}>
            <table>
              <tr>
                <td style={{ width: "200px" }}>Tiêu đề</td>
                <td>
                  <input
                    style={{ width: "200px" }}
                    onChange={(e) => setcalendarEventName(e.target.value)}
                    defaultValue={calendarEventName}
                    type="text"
                    maxlength="100"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Loại lịch</td>
                <td>
                  <CFormSelect
                    style={{ width: "200px" }}
                    defaultValue={calendarEventType}
                    onChange={(e) => setcalendarEventType(e.target.value)}
                  >
                    <option value="Meeting">Lịch họp</option>
                    <option value="Examination">Lịch thi</option>
                  </CFormSelect>
                </td>
              </tr>
              {calendarEventType === "Examination" ? (
                <tr>
                  <td>Môn học</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      defaultValue={subjectId}
                      onChange={(e) => {
                        setsubjectId(Number(e.target.value));
                      }}
                    >
                      <option>Môn học</option>
                      {listsubject?.map((item) => (
                        <option value={item.subjectId}>
                          {mapSubjects[item.subject.replace(" ", "_")]}
                        </option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              ) : (
                ""
              )}
              <tr>
                <td>Thời gian bắt đầu</td>
                <td>
                  <input
                    defaultValue={timeStart}
                    onChange={(e) => settimeStart(e.target.value.toString())}
                    type="time"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Thời gian kết thúc</td>
                <td>
                  <input
                    onChange={(e) => settimeFinish(e.target.value.toString())}
                    defaultValue={timeFinish}
                    type="time"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Ngày</td>
                <td>
                  <input
                    style={{ width: "200px" }}
                    onChange={(e) => setdate(e.target.value.toString())}
                    defaultValue={date}
                    type="date"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Phòng</td>
                <td>
                  <CFormSelect
                    style={{ width: "200px" }}
                    onChange={(e) => setroomId(Number(e.target.value))}
                    defaultValue={
                      roomId
                      // listroom?.find((element) => {
                      //   return element.room === roomName;
                      // })?.roomId
                    }
                  >
                    {listroom?.map((item) => (
                      <option key={item.roomId} value={item.roomId}>
                        {item.room}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td>Thành phần tham dự</td>
                <td>
                  <table>
                    <thead>
                      <th style={{ width: "80%" }}>
                        <CFormSelect
                          onChange={(e) => {
                            setuserIds(
                              userIds.concat([Number(e.target.value)])
                            );
                          }}
                        >
                          <option>Giáo viên</option>
                          {listteacher?.map((item) => (
                            <option
                              key={item.userId}
                              value={item.userId}
                              label={item.displayName}
                            ></option>
                          ))}
                        </CFormSelect>
                      </th>
                      <th></th>
                    </thead>
                    <tbody>
                      {userIds?.map((item) => (
                        <tr key={item}>
                          <td>
                            {
                              listteacher?.find((element) => {
                                return element.userId === Number(item);
                              })?.displayName
                            }
                          </td>
                          <td>
                            <button
                              onClick={(e) =>
                                setuserIds(userIds.filter((it) => it !== item))
                              }
                              className="btn btn-danger"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <table>
                    <thead>
                      <th style={{ width: "80%" }}>
                        <CFormSelect
                          onChange={(e) => {
                            setclassIds(
                              classIds.concat([Number(e.target.value)])
                            );
                          }}
                        >
                          <option>Lớp</option>
                          {listclass?.map((item) => (
                            <option
                              key={item.classId}
                              value={item.classId}
                              label={item.clazz}
                            ></option>
                          ))}
                        </CFormSelect>
                      </th>
                      <th></th>
                    </thead>
                    <tbody>
                      {classIds?.map((item) => (
                        <tr key={item}>
                          <td>
                            {
                              listclass?.find((element) => {
                                return element.classId === Number(item);
                              })?.clazz
                            }
                          </td>
                          <td>
                            <button
                              onClick={(e) =>
                                setclassIds(
                                  classIds.filter((it) => it !== item)
                                )
                              }
                              className="btn btn-danger"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            <div className="text-end" style={{ color: "red" }}>
              {" "}
              {messenger}
            </div>
            <br />
            <div className="text-center">
              <button className="btn btn-primary " type="submit">
                Lưu thông tin
              </button>
            </div>
          </form>
        </CModalBody>
      </CModal>

      <div style={{ height: "60%", width: "100%", padding: "5px 2px 2px 2px" }}>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <table className="table table-dark" style={{ border: "0" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "15%" }}>
                  <CFormSelect
                    onChange={(e) => setschoolYearId(Number(e.target.value))}
                  >
                    <option>Năm học</option>
                    {listyear?.map((item) => (
                      <option
                        key={item.schoolYearId}
                        value={item.schoolYearId}
                        label={item.schoolYear}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "7%" }}>Học kì:</td>
                <td style={{ textAlign: "center", width: "10%" }}>
                  <CFormSelect
                    onChange={(e) => setsemesterId(Number(e.target.value))}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "center", width: "5%" }}>Lịch:</td>
                <td style={{ textAlign: "center", width: "15%" }}>
                  <CFormSelect onChange={(e) => set(e.target.value)}>
                    <option>Loại lịch</option>
                    <option value="Meeting">Lịch họp</option>
                    <option value="Examination">Lịch thi</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "end" }}>
                  <CButton
                    onClick={(e) => {
                      settitle(true);
                      setVisible(true);
                      setuserIds([]);
                      setclassIds([]);
                      setcalendarEventName("");
                      setsubjectId(0);
                    }}
                    className="btn btn-primary"
                    type="button"
                  >
                    Thêm mới
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      <table
        className="table table-borderded"
        style={{ border: "1px solid #ddd" }}
        {...getTableProps()}
      >
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
                  <Link
                    className="edit"
                    title="Sửa"
                    cshools-toggle="tooltip"
                    onClick={(e) => {
                      //setuserIds([]);
                      update(row.original.calendarEventId);
                    }}
                  >
                    <i className="material-icons" style={{ color: "yellow" }}>
                      &#xE254;
                    </i>
                  </Link>
                  <Link
                    className="delete"
                    title="Xóa"
                    cshools-toggle="tooltip"
                    onClick={(e) => del(row.original.calendarEventId)}
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
