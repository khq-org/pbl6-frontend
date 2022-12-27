import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export const AdminSchoolDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [schoolId, setschoolId] = useState(0);
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [mes, setmes] = useState("");

  const { id } = useParams();
  let nav = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`schooladmins/${id}`);
        console.log({ data });
        setfirstName(data.data.firstName);
        setlastName(data.data.lastName);
        setusername(data.data.username);
        setemail(data.data.email);
        setpassword(data.data.password);
        setschoolId(data.data.schoolId);
      } catch (e) {}
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put(`schooladmins/${id}`, {
      firstName,
      lastName,
      email,
      password,
      schoolId,
    });
    if (res.status === 200) {
      window.alert("Thành công.");
      //nav(-1);
    } else {
      alert("Thất bại.");
      //console.log(response.response.data.errorDTOs);
      setmes(
        `Lỗi: ${res.response.data.errorDTOs[0].key}: ${res.response.data.errorDTOs[0].value}`
      );
    }
  };

  return (
    <div className="container rounded bg-white mt-0 mb-0">
      <div className="text-center">
        <form onSubmit={save}>
          <h4>Thông tin tài khoản quản trị trường học</h4>
          <table style={{ marginLeft: "30%", width: "400px" }}>
            <tr>
              <td>Họ</td>
              <td>
                <input
                  type="text"
                  maxlength="100"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Tên</td>
              <td>
                <input
                  type="text"
                  maxlength="100"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Tài khoản</td>
              <td>
                <input type="text" maxlength="100" value={username} readOnly />
              </td>
            </tr>
            <tr>
              <td>Mật khẩu</td>
              <td>
                <input
                  type="text"
                  maxlength="100"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </td>
            </tr>
          </table>
          <div style={{ color: "red" }}>{mes}</div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              <span>Lưu thông tin</span>
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => nav(-1)}
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
