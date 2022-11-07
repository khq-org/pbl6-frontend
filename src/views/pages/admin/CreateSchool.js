import "./CreateSchool.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CAlert, CButton } from "@coreui/react";

export const CreateSchool = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [school, setschool] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [website, setwebsite] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [nav, setnav] = useState(false);
  const [user, setUser] = useState("test");
  let navigate = useNavigate();

  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("schools", {
      school,
      phone,
      street,
      district,
      city,
      website,
    });
    //console.log({ data });
    const schoolId = data.data.id;
    const res = await axios.post("schooladmins", {
      firstName,
      lastName,
      email,
      schoolId,
    });
    //console.log({ res });

    const id = await axios.get(`schooladmins/${res.data.data.id}`);
    setUser(id.data.data.username);
    //console.log({ id });

    setnav(true);
  };

  return (
    <>
      {nav ? (
        <section>
          <div className="text-center mx-5">
            <div>Create success!</div>
            <br />
            <table className=" table-bordered text-start mx-auto">
              <tr>
                <th>School</th>
                <th>{school}</th>
              </tr>
              <tr>
                <th>UserAdmin</th>
                <th>{user}</th>
              </tr>
              <tr>
                <th>PassWord</th>
                <th>{user}</th>
              </tr>
            </table>
            <br />

            <CButton color="success" onClick={() => navigate(-1)}>
              Quay lại
            </CButton>
          </div>
        </section>
      ) : (
        <div className="container rounded bg-white mt-0 mb-0">
          <form className="row" onSubmit={save}>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-right">Create Customer</h2>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <b>Name School</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name school"
                      onChange={(e) => setschool(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <b>Phone</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="phone"
                      onChange={(e) => setphone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <b>Street</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="street"
                      onChange={(e) => setstreet(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <b>District</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="district"
                      onChange={(e) => setdistrict(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <b>City</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="city"
                      onChange={(e) => setcity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <b>Website</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="website"
                      onChange={(e) => setwebsite(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <br />
                <br />
                <div className="d-flex justify-content-between align-items-center experience">
                  <h3>Account(School Admin)</h3>
                </div>
                <br />
                <br />

                <div className="col-md-12">
                  <b>First Name</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div className="col-md-12">
                  <b>Last Name</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="last name"
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div className="col-md-12">
                  <b>Email</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
