import React from "react";

import CITY from "../vn/CITY.json";
import DISTRICT from "../vn/DISTRICT.json";
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
  const [profile, setprofile] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users");
        console.log({ data });
        setfirstName(data.data.user.firstName);
        setlastName(data.data.user.lastName);
        setgender(data.data.user.gender);
        setdateOfBirth(data.data.user.dateOfBirth);
        setphone(data.data.user.phone);
        setemail(data.data.user.email);
        setplaceOfBirth(data.data.user.placeOfBirth);
        setstreet(data.data.user.street);
        setdistrict(data.data.user.district);
        setcity(data.data.user.city);
        //setworkingPosition(data.data.users.workingPosition);
        setnationality(data.data.user.nationality);
        setusername(data.data.user.username);
        const res = await axios.get("students/profile");
        console.log(res);
        setprofile(res.data.data);
      } catch (e) {}
    })();
  }, []);

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
  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put("users", {
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
      roleId: 4,
    });

    if (res.status === 200) {
      window.alert("Thành công.");
    } else {
      window.alert("Thất bại.");
    }
  };
  return (
    <>
      <div
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
            <table className="table table-light">
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
                      readOnly
                    />
                  </td>

                  <td classname="auto-style11">Tên:</td>
                  <td>
                    <input
                      type="text"
                      size="100"
                      value={firstName}
                      style={{ width: "180px" }}
                      readOnly
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
                      readOnly
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
                      readOnly
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
            <div className="text-end">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={save}
              >
                Cập nhật thông tin cá nhân
              </button>
            </div>
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
            <table className="table table-light">
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }} classname="auto-style24">
                    Họ:
                  </td>
                  <td>
                    <input
                      value={profile?.student?.parents[0]?.lastName}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td>Tên:</td>
                  <td>
                    <input
                      value={profile?.student?.parents[0]?.firstName}
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
                      value={profile?.student?.parents[0]?.job}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Số điện thoại:</td>
                  <td>
                    <input
                      value={phone}
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
                      value={street}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Tỉnh/thành phố:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      value={listcity.find((item) => item.name === city)?.code}
                      onChange={(e) => setadd(e.target.value)}
                    >
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td>Quận/huyện:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      value={district}
                      onChange={(e) => setdistrict(e.target.value)}
                    >
                      {listdistrict.map((item) => (
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
            <table className="table table-light">
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }} classname="auto-style24">
                    Họ:
                  </td>
                  <td>
                    <input
                      value={profile?.student?.parents[1]?.lastName}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td>Tên:</td>
                  <td>
                    <input
                      value={profile?.student?.parents[1]?.firstName}
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
                      value={profile?.student?.parents[1]?.job}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Số điện thoại:</td>
                  <td>
                    <input
                      value={phone}
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
                      value={street}
                      type="text"
                      size="100"
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>Tỉnh/thành phố:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      value={listcity.find((item) => item.name === city)?.code}
                      onChange={(e) => setadd(e.target.value)}
                    >
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td>Quận/huyện:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      value={district}
                      onChange={(e) => setdistrict(e.target.value)}
                    >
                      {listdistrict.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="mt-5 text-end">
          <button className="btn btn-primary profile-button" type="button">
            Cập nhật thông tin
          </button>
        </div> */}
        <br />
        <br />
      </div>
    </>
  );
};

export default StudentDetail;
