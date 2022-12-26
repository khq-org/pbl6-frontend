import React from "react";
import "./table.css";
import { Link, useParams } from "react-router-dom";
import CITY from "../../vn/CITY.json";
import DISTRICT from "../../vn/DISTRICT.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const StudentDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
  const [workingPosition, setworkingPosition] = useState("Student");
  const [username, setusername] = useState("");
  const [nationality, setnationality] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);
  const [classId, setclassId] = useState(1);
  const [classes, setclasses] = useState();
  //cha
  const [idFather, setidFather] = useState(0);
  const [firstNameFather, setfirstNameFather] = useState("");
  const [lastNameFather, setlastNameFather] = useState("");
  const [phoneFather, setphoneFather] = useState("");
  const [jobFather, setjobFather] = useState("");
  const [streetFather, setstreetFather] = useState("");
  const [districtFather, setdistrictFather] = useState("");
  const [cityFather, setcityFather] = useState("");
  const [listdistrictFather, setlistdistrictFather] = useState([]);
  //me
  const [idMother, setidMother] = useState(0);
  const [firstNameMother, setfirstNameMother] = useState("");
  const [lastNameMother, setlastNameMother] = useState("");
  const [phoneMother, setphoneMother] = useState("");
  const [jobMother, setjobMother] = useState("");
  const [streetMother, setstreetMother] = useState("");
  const [districtMother, setdistrictMother] = useState("");
  const [cityMother, setcityMother] = useState("");
  const [listdistrictMother, setlistdistrictMother] = useState([]);

  const [learningResults, setlearningResults] = useState([]);
  //const learningResults = [];
  const { id } = useParams();
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
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`students/${id}`);
        console.log({ data });
        setclasses(data.data.classes);

        setfirstName(data.data.student.firstName);
        setlastName(data.data.student.lastName);
        setgender(data.data.student.gender);
        setdateOfBirth(data.data.student.dateOfBirth);
        setphone(data.data.student.phone);
        setemail(data.data.student.email);
        setplaceOfBirth(data.data.student.placeOfBirth);
        setstreet(data.data.student.street);
        setdistrict(data.data.student.district);
        setcity(data.data.student.city);
        //setworkingPosition(data.data.students.workingPosition);
        setnationality(data.data.student.nationality);
        setusername(data.data.student.username);

        setidFather(data.data.parents[0]?.userId);
        setfirstNameFather(data.data.parents[0]?.firstName);
        setlastNameFather(data.data.parents[0]?.lastName);
        setphoneFather(data.data.parents[0]?.phone);
        setjobFather(data.data.parents[0]?.job);
        setstreetFather(data.data.parents[0]?.street);
        setdistrictFather(data.data.parents[0]?.district);
        setcityFather(data.data.parents[0]?.city);

        setidMother(data.data.parents[1]?.userId);
        setfirstNameMother(data.data.parents[1]?.firstName);
        setlastNameMother(data.data.parents[1]?.lastName);
        setphoneMother(data.data.parents[1]?.phone);
        setjobMother(data.data.parents[1]?.job);
        setstreetMother(data.data.parents[1]?.street);
        setdistrictMother(data.data.parents[1]?.district);
        setcityMother(data.data.parents[1]?.city);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`students/profile?studentId=${id}`);
        //console.log({ data });
        // for (let i = 0; i < data.data.learningResults.length(); i++) {
        //   handlesetlearningResults(
        //     data.data.learningResults[i]?.learningResultId,
        //     i
        //   );
        // }

        data.data.learningResults?.map((item, index) => {
          handlesetlearningResults(item.learningResultId, index);
        });
      } catch (e) {}
    })();
  }, []);

  const handlesetlearningResults = async (id, index) => {
    const { data } = await axios.get(`learningresults/${id}`);

    learningResults[index] = data.data;
    setlearningResults([...learningResults]);

    //setlearningResults(learningResults.concat([data.data]));
  };
  console.log("test", learningResults);
  useEffect(() => {
    (async () => {
      try {
        setlistcity(CITY);
        setlistdistrict(DISTRICT);
        setlistdistrictFather(DISTRICT);
        setlistdistrictMother(DISTRICT);
      } catch (e) {}
    })();
  }, []);
  const setadd = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcity(c.name);

    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrict(d);
  };
  const setaddFather = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcityFather(c.name);

    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrictFather(d);
  };
  const setaddMother = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcityMother(c.name);

    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrictMother(d);
  };
  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put(`students/${id}`, {
      student: {
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
      },
      classes,
      parents: [
        {
          userId: idFather,
          firstName: firstNameFather,
          lastName: lastNameFather,
          phone: phoneFather,
          job: jobFather,
          street: streetFather,
          district: districtFather,
          city: cityFather,
        },
        {
          userId: idMother,
          firstName: firstNameMother,
          lastName: lastNameMother,
          phone: phoneMother,
          job: jobMother,
          street: streetMother,
          district: districtMother,
          city: cityMother,
        },
      ],
    });

    if (res.status === 200) {
      window.alert("Thành công.");
    } else {
      window.alert("Thất bại.");
    }
  };
  return (
    <>
      <form
        onSubmit={save}
        id="tabs_LcSV-divT0"
        style={{ width: "100%", padding: "5px 2px 2px 2px" }}
      >
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div id="Div1" style={{ width: "100%" }}>
            <div classname="GreyBoxCaption" style={{ height: "20px" }}>
              <h4> THÔNG TIN CÁ NHÂN:</h4>
            </div>
            <br />
            <div
              id="LopHPdivCapQLStatus"
              style={{ marginLeft: "10px", float: "left" }}
            />
            <div style={{ clear: "both" }} />
          </div>
          <div>
            <table className="table table-info">
              <tbody>
                <tr>
                  <td style={{ textAlign: "left", width: "180px" }} rowSpan={7}>
                    <img
                      classname="imgCB"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/768px-Microsoft_Account.svg.png"
                      style={{ height: "140px", width: "120px" }}
                    />
                  </td>
                  <td classname="auto-style11">Họ:</td>
                  <td>
                    <input
                      type="text"
                      size="100"
                      value={lastName}
                      style={{ width: "180px" }}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </td>

                  <td classname="auto-style11">Tên:</td>
                  <td>
                    <input
                      type="text"
                      size="100"
                      value={firstName}
                      style={{ width: "180px" }}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style14">
                    Nơi sinh:
                  </td>
                  <td>
                    <input
                      type="text"
                      size="100"
                      value={placeOfBirth}
                      style={{ width: "230px" }}
                      onChange={(e) => setplaceOfBirth(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td classname="auto-style11">Giới tính:</td>
                  <td>
                    <CFormSelect
                      onChange={(e) => setgender(e.target.value)}
                      value={gender}
                      style={{ width: "180px" }}
                    >
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </CFormSelect>
                  </td>
                  <td classname="auto-style11">Ngày sinh:</td>
                  <td classname="auto-style1">
                    <input
                      type="date"
                      style={{ width: "180px" }}
                      value={dateOfBirth}
                      onChange={(e) => setdateOfBirth(e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style14">
                    Quốc tịch:
                  </td>
                  <td>
                    <input
                      type="text"
                      size="100"
                      value={nationality}
                      style={{ width: "230px" }}
                      onChange={(e) => setnationality(e.target.value)}
                    />
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td classname="auto-style11">Số CCCD:</td>
                  <td>
                    <input type="text" size="100" style={{ width: "180px" }} />
                  </td>
                  <td classname="auto-style17">Ngày cấp:</td>
                  <td classname="auto-style1">
                    <input type="date" style={{ width: "180px" }} />
                  </td>
                  <td classname="auto-style15">&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr></tr>
                <tr></tr>

                <tr>
                  <td classname="auto-style4" style={{ textAlign: "right" }}>
                    &nbsp;
                  </td>
                  <td colSpan={2}>&nbsp;</td>
                  <td classname="auto-style1">&nbsp;</td>
                  <td classname="auto-style14" style={{ textAlign: "right" }}>
                    &nbsp;
                  </td>
                  <td>&nbsp;</td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    Tài khoản
                  </td>
                  <td colSpan={2}>
                    <input
                      type="text"
                      size="100"
                      value={username}
                      style={{ width: "350px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style10">
                    Email cá nhân:
                  </td>
                  <td colSpan={2}>
                    <input
                      type="email"
                      size="100"
                      style={{ width: "310px" }}
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    Điện thoại:
                  </td>
                  <td colSpan={2}>
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      style={{ width: "350px" }}
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </td>
                  <td classname="auto-style10">&nbsp;</td>
                  <td colSpan={2}>&nbsp;</td>
                </tr>

                <tr>
                  <td style={{ textAlign: "right" }} colSpan={2}>
                    <em>
                      <strong>Địa chỉ cư trú hiện nay: </strong>
                    </em>
                  </td>
                  <td colSpan={3}>
                    <input
                      type="text"
                      size="100"
                      value={street}
                      title="Cần nhập thông tin cụ thể Số nhà, Đường (hoặc Xóm, Thôn) để ghép với Thành phố, Quận, Phường (hoặc Tỉnh, Huyện, Xã) dưới đây"
                      style={{ width: "350px" }}
                      onChange={(e) => setstreet(e.target.value)}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }} colSpan={2}>
                    Tỉnh/ Thành phố:
                  </td>
                  <td>
                    <div id="CN_divTinhCTru">
                      <CFormSelect
                        style={{ width: "185px" }}
                        value={
                          listcity.find((item) => item.name === city)?.code
                        }
                        onChange={(e) => setadd(e.target.value)}
                      >
                        {listcity.map((item) => (
                          <option value={item.code} label={item.name}></option>
                        ))}
                      </CFormSelect>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style17">
                    Huyện/ Quận:
                  </td>
                  <td classname="auto-style1">
                    <div id="CN_divQuanCTru">
                      <CFormSelect
                        style={{ width: "185px" }}
                        value={district}
                        onChange={(e) => setdistrict(e.target.value)}
                      >
                        {listdistrict.map((item) => (
                          <option value={item.name} label={item.name}></option>
                        ))}
                      </CFormSelect>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div id="Div1" style={{ width: "100%" }}>
            <div classname="GreyBoxCaption" style={{ height: "20px" }}>
              <h4>THÔNG TIN NHÂN THÂN:</h4>
            </div>
            <br />
            <div style={{ marginLeft: "10px", float: "left" }} />
            <div style={{ clear: "both" }} />
          </div>
          <div>
            <h5>Cha</h5>
            <table className="table table-info">
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }} classname="auto-style24">
                    Họ:
                  </td>
                  <td>
                    <input
                      value={lastNameFather}
                      onChange={(e) => setlastNameFather(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td>Tên:</td>
                  <td>
                    <input
                      value={firstNameFather}
                      onChange={(e) => setfirstNameFather(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>

                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Nghề nghiệp:</td>
                  <td>
                    <input
                      value={jobFather}
                      onChange={(e) => setjobFather(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Số điện thoại:</td>
                  <td>
                    <input
                      value={phoneFather}
                      onChange={(e) => setphoneFather(e.target.value)}
                      type="tel"
                      pattern="[0-9]{10}"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td>
                    <input
                      value={streetFather}
                      onChange={(e) => setstreetFather(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Tỉnh/thành phố:</td>
                  <td>
                    <CFormSelect
                      value={
                        listcity.find((item) => item.name === cityFather)?.code
                      }
                      style={{ width: "200px" }}
                      onChange={(e) => setaddFather(e.target.value)}
                    >
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td>Quận/huyện:</td>
                  <td>
                    <CFormSelect
                      value={districtFather}
                      style={{ width: "200px" }}
                      onChange={(e) => setdistrictFather(e.target.value)}
                    >
                      {listdistrictFather.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h5>Mẹ</h5>
            <table className="table table-info">
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }} classname="auto-style24">
                    Họ:
                  </td>
                  <td>
                    <input
                      value={lastNameMother}
                      onChange={(e) => setlastNameMother(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td>Tên:</td>
                  <td>
                    <input
                      value={firstNameMother}
                      onChange={(e) => setfirstNameMother(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>

                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Nghề nghiệp:</td>
                  <td>
                    <input
                      value={jobMother}
                      onChange={(e) => setjobMother(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Số điện thoại:</td>
                  <td>
                    <input
                      value={phoneMother}
                      onChange={(e) => setphoneMother(e.target.value)}
                      type="tel"
                      pattern="[0-9]{10}"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td>
                    <input
                      value={streetMother}
                      onChange={(e) => setstreetMother(e.target.value)}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Tỉnh/thành phố:</td>
                  <td>
                    <CFormSelect
                      value={
                        listcity.find((item) => item.name === cityMother)?.code
                      }
                      style={{ width: "200px" }}
                      onChange={(e) => setaddMother(e.target.value)}
                    >
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td>Quận/huyện:</td>
                  <td>
                    <CFormSelect
                      value={districtMother}
                      style={{ width: "200px" }}
                      onChange={(e) => setdistrictMother(e.target.value)}
                    >
                      {listdistrictMother.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button className="btn btn-primary profile-button" type="submit">
            Cập nhật thông tin
          </button>
        </div>
        <br />
        <br />
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div id="Div1" style={{ width: "100%" }}>
            <div classname="GreyBoxCaption" style={{ height: "20px" }}>
              <h4>KẾT QUẢ HỌC TẬP:</h4>
            </div>
            <br />
            <div style={{ marginLeft: "10px", float: "left" }} />
            <div style={{ clear: "both" }} />
          </div>

          <div className="mb-5">
            <div>
              <div>
                <b>Lớp: </b>
                {learningResults[0]?.learningResult?.className}
              </div>
              <div>
                <b>Năm học:</b> {learningResults[0]?.learningResult?.schoolYear}
              </div>
              <div>
                <b>Giáo viên chủ nhiệm:</b>{" "}
              </div>
              <table className="table table-bordered">
                <tr>
                  <th></th>

                  <th colSpan={3}>Điểm trung bình</th>

                  <th></th>
                </tr>
                <tr>
                  <th>Môn học</th>
                  <th>HKI</th>
                  <th>HKII</th>
                  <th>Cả năm</th>
                  <th>Giáo viên bộ môn</th>
                </tr>

                <tbody className="text-center">
                  {learningResults[0]?.studyScores?.map((item, i) => (
                    <tr>
                      <td>
                        {
                          mapSubjects[
                            item.subject.subjectName.replace(" ", "_")
                          ]
                        }
                      </td>
                      <td>{item.semesterScores[0]?.avgScore.toFixed(2)}</td>
                      <td>{item.semesterScores[1]?.avgScore.toFixed(2)}</td>
                      <td>{item.avgScore.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  ))}
                  <tr>
                    <td>Điểm trung bình các môn học</td>
                    <td></td>
                    <td></td>
                    <td>{learningResults[0]?.avgScore.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="text-center">
              <table className="table table-bordered ">
                <tr>
                  <th>HỌC KÌ</th>
                  <th>Hạnh kiểm</th>
                  <th>Học lực</th>
                  <th>Tổng số buổi nghỉ học cả năm</th>
                  <th>Xét lên lớp</th>
                </tr>
                <tr>
                  <td>Học kì I</td>
                  <td>{learningResults[0]?.learningResult?.conduct}</td>
                  <td>{learningResults[0]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Học kì II</td>
                  <td>{learningResults[0]?.learningResult?.conduct}</td>
                  <td>{learningResults[0]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Cả năm</td>
                  <td>{learningResults[0]?.learningResult?.conduct}</td>
                  <td>{learningResults[0]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td>
                    {learningResults[0]?.learningResult?.isPassed ? "v" : ""}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="mb-5">
            <div>
              <div>
                <b>Lớp: </b>
                {learningResults[1]?.learningResult?.className}
              </div>
              <div>
                <b>Năm học:</b> {learningResults[1]?.learningResult?.schoolYear}
              </div>
              <div>
                <b>Giáo viên chủ nhiệm:</b>{" "}
              </div>
              <table className="table table-bordered">
                <tr>
                  <th></th>

                  <th colSpan={3}>Điểm trung bình</th>

                  <th></th>
                </tr>
                <tr>
                  <th>Môn học</th>
                  <th>HKI</th>
                  <th>HKII</th>
                  <th>Cả năm</th>
                  <th>Giáo viên bộ môn</th>
                </tr>
                <tbody className="text-center">
                  {learningResults[1]?.studyScores?.map((item, i) => (
                    <tr>
                      <th>
                        {
                          mapSubjects[
                            item.subject.subjectName.replace(" ", "_")
                          ]
                        }
                      </th>
                      <td>{item.semesterScores[0]?.avgScore.toFixed(2)}</td>
                      <td>{item.semesterScores[1]?.avgScore.toFixed(2)}</td>
                      <td>{item.avgScore.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  ))}
                  <tr>
                    <td>Điểm trung bình các môn học</td>
                    <td></td>
                    <td></td>
                    <td>{learningResults[1]?.avgScore.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="text-center">
              <table className="table table-bordered ">
                <tr>
                  <th>HỌC KÌ</th>
                  <th>Hạnh kiểm</th>
                  <th>Học lực</th>
                  <th>Tổng số buổi nghỉ học cả năm</th>
                  <th>Xét lên lớp</th>
                </tr>
                <tr>
                  <td>Học kì I</td>
                  <td>{learningResults[1]?.learningResult?.conduct}</td>
                  <td>{learningResults[1]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Học kì II</td>
                  <td>{learningResults[1]?.learningResult?.conduct}</td>
                  <td>{learningResults[1]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Cả năm</td>
                  <td>{learningResults[1]?.learningResult?.conduct}</td>
                  <td>{learningResults[1]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td>
                    {learningResults[1]?.learningResult?.isPassed ? "v" : ""}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="mb-5">
            <div>
              <div>
                <b>Lớp: </b>
                {learningResults[2]?.learningResult?.className}
              </div>
              <div>
                <b>Năm học:</b> {learningResults[2]?.learningResult?.schoolYear}
              </div>
              <div>
                <b>Giáo viên chủ nhiệm:</b>{" "}
              </div>
              <table className="table table-bordered">
                <tr>
                  <th></th>

                  <th colSpan={3}>Điểm trung bình</th>

                  <th></th>
                </tr>
                <tr>
                  <th>Môn học</th>
                  <th>HKI</th>
                  <th>HKII</th>
                  <th>Cả năm</th>
                  <th>Giáo viên bộ môn</th>
                </tr>
                <tbody className="text-center">
                  {learningResults[2]?.studyScores?.map((item, i) => (
                    <tr>
                      <th>
                        {
                          mapSubjects[
                            item.subject.subjectName.replace(" ", "_")
                          ]
                        }
                      </th>
                      <td>{item.semesterScores[0]?.avgScore.toFixed(2)}</td>
                      <td>{item.semesterScores[1]?.avgScore.toFixed(2)}</td>
                      <td>{item.avgScore.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  ))}
                  <tr>
                    <td>Điểm trung bình các môn học</td>
                    <td></td>
                    <td></td>
                    <td>{learningResults[2]?.avgScore.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="text-center">
              <table className="table table-bordered ">
                <tr>
                  <th>HỌC KÌ</th>
                  <th>Hạnh kiểm</th>
                  <th>Học lực</th>
                  <th>Tổng số buổi nghỉ học cả năm</th>
                  <th>Xét lên lớp</th>
                </tr>
                <tr>
                  <td>Học kì I</td>
                  <td>{learningResults[2]?.learningResult?.conduct}</td>
                  <td>{learningResults[2]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Học kì II</td>
                  <td>{learningResults[2]?.learningResult?.conduct}</td>
                  <td>{learningResults[2]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Cả năm</td>
                  <td>{learningResults[2]?.learningResult?.conduct}</td>
                  <td>{learningResults[2]?.learningResult?.learningGrade}</td>
                  <td>0</td>
                  <td>
                    {learningResults[2]?.learningResult?.isPassed ? "v" : ""}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          {/* <div className=" text-center mb-5">
            <table>
              <thead>
                <th>STT</th>
                <th>Năm học</th>
                <th>Lớp</th>
                <th>Điểm trung bình năm</th>
                <th>Hạnh kiểm </th>
                <th>Học lực</th>
                <th>Xét lên lớp</th>
                <th></th>
              </thead>
              <tbody>
                {learningResults?.map((item, index) => (
                  <tr key={item.learningResultId}>
                    <td>{index + 1}</td>
                    <td>{item.schoolYear}</td>
                    <td>{item.className}</td>
                    <td>{item.averageScore}</td>
                    <td>{item.conduct}</td>
                    <td>{item.learningGrade}</td>
                    <td>{item.isPassed ? "V" : ""}</td>
                    <td>
                      <Link>
                        <i className="material-icons">&#xE417;</i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default StudentDetail;
