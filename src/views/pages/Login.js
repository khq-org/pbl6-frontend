import "./Login.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState("");
  const [err, seterr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("access_token", data.access_token);
      //console.log(jwt_decode(data.access_token)?.roles[0]);

      const token = localStorage.getItem("access_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.get("users");
      localStorage.setItem("account", res.data.data.user.displayName);
      localStorage.setItem("school", res.data.data.user.schoolName);

      setNavigate(jwt_decode(data.access_token)?.roles[0]);
      seterr("");
    } catch (e) {
      //window.alert("failed");
      seterr("Đăng nhập thất bại. Kiểm tra lại.");
    }
  };

  if (navigate === "ADMIN") {
    return <Navigate to="/admin/home" />;
  }
  if (navigate === "SCHOOL") {
    return <Navigate to="/dashboard" />;
  }
  if (navigate === "TEACHER") {
    return <Navigate to="/teacher/profile" />;
  }
  if (navigate === "STUDENT") {
    return <Navigate to="/student/profile" />;
  }
  return (
    // <div style={{ backgroundColor: "#3c4b64" }}>
    <div>
      <div className="box-form">
        <div className="left">
          <div
            className="overlay"
            style={{
              color: "#e0dfdc",

              letterSpacing: ".1em",
              textShadow:
                "0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0, 0, 0, 0.9)",
            }}
          >
            <h1>School Management</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>PBL6_04</p>
          </div>
        </div>

        <div className="right">
          <br />

          <h5>Đăng nhập</h5>
          <br />
          <form onSubmit={submit}>
            <div className="inputs">
              <input
                type="text"
                size="100"
                placeholder="Tài khoản"
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <br />
              <input
                type="password"
                size="100"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="text-end" style={{ color: "red" }}>
              {err}
            </div>
            <br />
            <button type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};
