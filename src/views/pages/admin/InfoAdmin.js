import "./InfoAdmin.css";
import axios from "axios";
import { useState, useEffect } from "react";

export const InfoAdmin = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [profile, setProfile] = useState({});
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [placeOfBirth, setplaceOfBirth] = useState("");
  const [workingPosition, setworkingPosition] = useState("System admin");
  const [roleId, setroleId] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users");
        //console.log({ data });
        setProfile(data.data.user);
        setfirstName(data.data.user.firstName);
        setlastName(data.data.user.lastName);
        setphone(data.data.user.phone);
        setemail(data.data.user.email);
        setstreet(data.data.user.street);
        setdistrict(data.data.user.district);
        setcity(data.data.user.city);
        setplaceOfBirth(data.data.user.placeOfBirth);
      } catch (e) {}
    })();
  }, []);
  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put("users", {
      firstName,
      lastName,
      phone,
      email,
      street,
      district,
      city,
      placeOfBirth,
      workingPosition,
      roleId,
    });
    alert("done.");
    //console.log({ res });
  };

  return (
    <div className="container rounded bg-white mt-0 mb-0">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">
              <b>{profile.displayName}</b>
            </span>
            <span className="text-black-50">{profile.email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-right">Profile Settings</h2>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <b>FirstName</b>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <b>LastName</b>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <b>Mobile Number</b>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <b>Place Of Birth</b>
                <input
                  type="text"
                  className="form-control"
                  value={placeOfBirth}
                  onChange={(e) => setplaceOfBirth(e.target.value)}
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
                <b>Email ID</b>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <b>Role</b>
                <input
                  type="text"
                  className="form-control"
                  value={profile.role}
                  readOnly
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={save}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience"></div>
            <br />
            <br />

            <div className="col-md-6">
              <b>UserID</b>
              <input
                type="text"
                className="form-control"
                value={profile.userId}
                readOnly
              />
            </div>
            <br />
            <div className="col-md-6">
              <b>UserName</b>
              <input
                type="text"
                className="form-control"
                value={profile.username}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
