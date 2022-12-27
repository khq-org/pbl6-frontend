import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

export const SchoolDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [school, setschool] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [website, setwebsite] = useState("");
  const [listaccount, setlistaccount] = useState([]);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mes, setmes] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);

  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  //console.log({ id });
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`schools/${id}`);
        //console.log({ data });
        setschool(data.data.school);
        setphone(data.data.phone);
        setstreet(data.data.street);
        setdistrict(data.data.district);
        setcity(data.data.city);
        setwebsite(data.data.website);
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
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`schooladmins?schoolId=${id}`);
        setlistaccount(data.data.items);

        //console.log({ data });
      } catch (e) {}
    })();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await axios.post("schooladmins", {
      firstName,
      lastName,
      email,
      schoolId: id,
    });

    console.log(res);
    if (res.response?.status === 400) {
      setmes("Email đã tồn tại.");
    } else if (res?.status === 200) {
      setlistaccount([
        ...listaccount,
        {
          schoolAdminId: res.data.data?.id,
          firstName,
          lastName,
          email,
          schoolId: id,
        },
      ]);

      setmes("");
      setVisible(false);
      window.alert("Tạo tài khoản thành công.");
    }
  };

  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put(`schools/${id}`, {
      school,
      phone,
      street,
      district,
      city,
      website,
    });

    //console.log({ data });

    //console.log({ res });
    if (res.status === 200) {
      window.alert("Đã lưu thông tin.");
    } else {
      window.alert("Thất bại.");
    }

    //navigate(-1);
  };
  const del = async (schoolAdminId) => {
    if (window.confirm("Bạn muốn xóa tài khoản này?")) {
      const res = await axios.delete(`schooladmins/${schoolAdminId}`);
      //console.log(res);
      if (res.status === 200) {
        window.alert("Thành công.");
        setlistaccount(
          listaccount.filter((item) => item.schoolAdminId !== schoolAdminId)
        );
      } else {
        window.alert("Thất bại.");
      }
    }
    //window.location.reload();
  };
  //console.log(listaccount);

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Thêm mới tài khoản quản trị</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col-md-12">
              <b>Họ</b>
              <input
                type="text"
                maxlength="100"
                className="form-control"
                placeholder="họ"
                onChange={(e) => setlastName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-12">
              <b>Tên</b>
              <input
                type="text"
                className="form-control"
                placeholder="tên"
                maxlength="100"
                onChange={(e) => setfirstName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <b>Email</b>
              <input
                type="email"
                maxlength="100"
                className="form-control"
                placeholder="email"
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="text-end" style={{ color: "red" }}>
              {mes}
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary " type="submit">
                Thêm mới
              </button>
            </div>
          </form>
        </CModalBody>
      </CModal>
      <div className="container rounded bg-white mt-0 mb-0">
        <div className="row">
          <div>
            <td style={{ width: "60%" }}>
              <div>
                <form onSubmit={save}>
                  <div>
                    <br />
                    <div>
                      <h1 className="text-center">Thông tin trường học</h1>
                    </div>

                    <table>
                      <tr>
                        <td>
                          <b>Trường học</b>
                        </td>
                        <td>
                          <input
                            type="text"
                            maxlength="100"
                            className="form-control"
                            value={school}
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
                          <input
                            type="tel"
                            className="form-control"
                            pattern="[0-9]{10}"
                            value={phone}
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
                          <input
                            type="text"
                            maxlength="100"
                            className="form-control"
                            value={street}
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
                          <CFormSelect
                            value={district}
                            onChange={(e) => setdistrict(e.target.value)}
                          >
                            {listdistrict.map((item) => (
                              <option
                                value={item.name}
                                label={item.name}
                              ></option>
                            ))}
                          </CFormSelect>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Tỉnh/Thành phố</b>
                        </td>
                        <td>
                          <CFormSelect
                            value={
                              listcity.find((item) => item.name === city)?.code
                            }
                            onChange={(e) => setadd(e.target.value)}
                          >
                            {listcity.map((item) => (
                              <option
                                value={item.code}
                                label={item.name}
                              ></option>
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
                            maxlength="100"
                            className="form-control"
                            value={website}
                            onChange={(e) => setwebsite(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                    </table>

                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                      >
                        Lưu thông tin
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => navigate("/admin/home")}
                      >
                        Quay lại
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </td>
            <td></td>
            <td style={{ width: "40%" }}>
              <div className=" mx-5">
                <br />
                <br />
                <div className=" text-center">
                  <div className="text-left">
                    <h3>Tài khoản quản trị </h3>
                  </div>
                  <div className="text-end">
                    <CButton
                      onClick={() => {
                        setfirstName("");
                        setlastName("");
                        setemail("");
                        setVisible(!visible);
                      }}
                    >
                      Thêm mới
                    </CButton>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaccount.map((item) => (
                        <tr key={item.schoolAdminId}>
                          <td>{item.schoolAdminId}</td>
                          <td>{item.username}</td>
                          <td>
                            {item.lastName} {item.firstName}
                          </td>
                          <td>{item.email}</td>

                          <td>
                            <Link
                              to={`adminschooldetail/${item.schoolAdminId}`}
                              className="edit"
                              title="Edit"
                              cshools-toggle="tooltip"
                            >
                              <i
                                className="material-icons"
                                style={{ color: "yellow" }}
                              >
                                &#xE254;
                              </i>
                            </Link>

                            <Link
                              onClick={() => del(item.schoolAdminId)}
                              className="delete"
                              title="Delete"
                              cshools-toggle="tooltip"
                            >
                              <i
                                className="material-icons"
                                style={{ color: "red" }}
                              >
                                &#xE872;
                              </i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </td>
          </div>
        </div>
      </div>
    </>
  );
};
