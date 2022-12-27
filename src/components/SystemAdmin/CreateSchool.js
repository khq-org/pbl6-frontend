import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import CITY from "../vn/CITY.json";
import DISTRICT from "../vn/DISTRICT.json";
import {
  CModal,
  CButton,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CFormSelect,
} from "@coreui/react";

export const CreateSchool = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [visible, setVisible] = useState(false);
  const [school, setschool] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [website, setwebsite] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mes1, setmes1] = useState("");
  const [mes2, setmes2] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);

  const [user, setUser] = useState("test");
  let navigate = useNavigate();

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

    const data = await axios.post("schools", {
      school,
      phone,
      street,
      district,
      city,
      website,
    });
    if (data.status === 200) {
      console.log(data);
      const schoolId = data.data.data.id;
      const res = await axios.post("schooladmins", {
        firstName,
        lastName,
        email,
        schoolId,
      });
      console.log({ res });

      if (res.status === 200) {
        const id = await axios.get(`schooladmins/${res.data.data.id}`);
        setUser(id.data.data.username);
        //console.log({ id });
        setmes2("");

        setVisible(true);
      } else {
        setmes2(
          "Email đã tồn tại. Trường học đã được thêm vào hệ thống, bạn vào thông tin trường để tạo tài khoản quản trị."
        );
      }
      setmes1("");
    } else {
      setmes1("Trường học ở tỉnh/thành phố này đã tồn tại trong hệ thống.");
    }
  };

  return (
    <>
      <CModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <CModalHeader>
          <CModalTitle>Account</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="table table-bordered ">
            <tr>
              <th>Trường học</th>
              <th>{school}</th>
            </tr>
            <tr>
              <th>Tài khoản</th>
              <th>{user}</th>
            </tr>
            <tr>
              <th>Mật khẩu</th>
              <th>{user}</th>
            </tr>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
          >
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="container rounded bg-white mt-0 mb-0">
        <form className="row" onSubmit={save}>
          <div className="col-md-7 border-right">
            <div className="p-5 py-3">
              <div className="">
                <h2 className="text-center">Thêm mới trường học</h2>
              </div>
              <br />

              <table className="table">
                <tr>
                  <td>
                    <b>Trường học</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="tên trường"
                      onChange={(e) => setschool(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Số điện thoại</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="số điện thoại chuẩn 10 số"
                      pattern="[0-9]{10}"
                      onChange={(e) => setphone(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Địa chỉ</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="địa chỉ"
                      onChange={(e) => setstreet(e.target.value)}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Quận/Huyện</b>
                  </td>
                  <td>
                    <CFormSelect onChange={(e) => setdistrict(e.target.value)}>
                      {listdistrict.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Tỉnh/Thành phố</b>
                  </td>
                  <td>
                    <CFormSelect onChange={(e) => setadd(e.target.value)}>
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Website</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="website"
                      onChange={(e) => setwebsite(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              </table>
              <div className="text-end" style={{ color: "red" }}>
                {mes1}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-3 py-5">
              <br />
              <br />
              <div className="d-flex justify-content-between align-items-center experience">
                <h3>Tài khoản quản trị</h3>
              </div>
              <br />
              <br />

              <table className="table">
                <tr>
                  <td>
                    <b>Họ</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="họ"
                      onChange={(e) => setlastName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Tên</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      maxlength="100"
                      placeholder="tên"
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Email</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="email"
                      maxlength="100"
                      className="form-control"
                      placeholder="email"
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              </table>
              <div style={{ color: "red" }}>{mes2}</div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <button className="btn btn-primary profile-button" type="submit">
              Tạo mới
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger" onClick={() => navigate(-1)}>
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
