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
          "Email ???? t???n t???i. Tr?????ng h???c ???? ???????c th??m v??o h??? th???ng, b???n v??o th??ng tin tr?????ng ????? t???o t??i kho???n qu???n tr???."
        );
      }
      setmes1("");
    } else {
      setmes1("Tr?????ng h???c ??? t???nh/th??nh ph??? n??y ???? t???n t???i trong h??? th???ng.");
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
              <th>Tr?????ng h???c</th>
              <th>{school}</th>
            </tr>
            <tr>
              <th>T??i kho???n</th>
              <th>{user}</th>
            </tr>
            <tr>
              <th>M???t kh???u</th>
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
                <h2 className="text-center">Th??m m???i tr?????ng h???c</h2>
              </div>
              <br />

              <table className="table">
                <tr>
                  <td>
                    <b>Tr?????ng h???c</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="t??n tr?????ng"
                      onChange={(e) => setschool(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>S??? ??i???n tho???i</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="s??? ??i???n tho???i chu???n 10 s???"
                      pattern="[0-9]{10}"
                      onChange={(e) => setphone(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>?????a ch???</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="?????a ch???"
                      onChange={(e) => setstreet(e.target.value)}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Qu???n/Huy???n</b>
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
                    <b>T???nh/Th??nh ph???</b>
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
                <h3>T??i kho???n qu???n tr???</h3>
              </div>
              <br />
              <br />

              <table className="table">
                <tr>
                  <td>
                    <b>H???</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      maxlength="100"
                      className="form-control"
                      placeholder="h???"
                      onChange={(e) => setlastName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>T??n</b>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      maxlength="100"
                      placeholder="t??n"
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
              T???o m???i
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger" onClick={() => navigate(-1)}>
              Quay l???i
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
