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
      nav(-1);
    } else {
      window.alert("Thất bại.");
    }
  };

  return (
    <div className="container rounded bg-white mt-0 mb-0">
      <div className="p-5" style={{ width: "50%", marginLeft: "25%" }}>
        <form onSubmit={save} method="post" name="signupForm" id="signupForm">
          <h4 className="formTitle">Thông tin tài khoản quản trị trường học</h4>

          <div className="inputDiv">
            Họ
            <input
              type="text"
              value={lastName}
              size="100"
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div className="inputDiv">
            Tên
            <input
              type="text"
              size="100"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>

          <div className="inputDiv">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="inputDiv">
            Tài khoản
            <input type="text" value={username} readOnly />
          </div>
          <div className="inputDiv">
            Mật khẩu
            <input
              type="text"
              size="100"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="text-center mt-3">
            <button type="submit" id="submitButton" className="btn btn-primary">
              <span>Lưu thông tin</span>
            </button>
            <button className="btn btn-danger" onClick={() => nav(-1)}>
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
