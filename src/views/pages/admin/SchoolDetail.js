import "./CreateSchool.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  const { id } = useParams();
  //console.log({ id });

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
    setfirstName("");
    setlastName("");
    setemail("");
    //console.log({ res });
    window.location.reload();
  };
  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(`schools/${id}`, {
      school,
      phone,
      street,
      district,
      city,
      website,
    });
    //console.log({ data });

    //console.log({ res });

    //alert("done.");

    //navigate(-1);
  };
  const del = async (schoolAdminId) => {
    const res = await axios.delete(`schooladmins/${schoolAdminId}`);
    //console.log(res);
    //window.location.reload();
  };

  return (
    <div className="container rounded bg-white mt-0 mb-0">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <form className="row" onSubmit={save}>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-right">School Details</h2>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <b>Name School</b>
                <input
                  type="text"
                  className="form-control"
                  value={school}
                  onChange={(e) => setschool(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <b>Phone</b>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <b>Street</b>
                <input
                  type="text"
                  className="form-control"
                  value={street}
                  onChange={(e) => setstreet(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <b>District</b>
                <input
                  type="text"
                  className="form-control"
                  value={district}
                  onChange={(e) => setdistrict(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-12">
                <b>City</b>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <b>Website</b>
                <input
                  type="text"
                  className="form-control"
                  value={website}
                  onChange={(e) => setwebsite(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <br />
            <br />
            <div className="d-flex justify-content-between align-items-center experience">
              <h3>Account(School Admin) </h3>
            </div>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UserName</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listaccount.map((item) => (
                  <tr key={item.schoolAdminId}>
                    <td>{item.schoolAdminId}</td>
                    <td>{item.username}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>

                    <td>
                      <a
                        onClick={() => del(item.schoolAdminId)}
                        href=" "
                        className="delete"
                        title="Delete"
                        cshools-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h4>Create account</h4>
            </div>

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
            <div className="mt-5 text-center">
              <button className="btn btn-primary " onClick={create}>
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
