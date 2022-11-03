import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
export const Home = () => {
  const [listschool, setListschool] = useState([]);
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const del = async (id) => {
    const res = await axios.delete(`schools/${id}`);
    alert(`ban da xoa truong co id: ${id}`);
    console.log(res);
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schools");
        //console.log({ data });
        setListschool(data.data.items);
      } catch (e) {}
    })();
  }, []);

  return (
    <div className="main">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto"
      ></link>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h1>
                    <b>Customer</b>
                  </h1>
                </div>

                <div className="col-sm-4">
                  <div className="search-box">
                    <i className="material-icons">&#xE8B6;</i>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search&hellip;"
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="create">
                    <button className="btn btn-primary" type="button">
                      Create
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    Name <i className="fa fa-sort"></i>
                  </th>
                  <th>Phone</th>
                  <th>Street</th>
                  <th>District</th>
                  <th>City</th>
                  <th>Website</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listschool.map((item) => (
                  <tr key={item.schoolId}>
                    <td>{item.schoolId}</td>
                    <td>{item.school}</td>
                    <td>{item.phone}</td>
                    <td>{item.street}</td>
                    <td>{item.district}</td>
                    <td>{item.city}</td>
                    <td> {item.website}</td>
                    <td>
                      <a
                        href={`home/schooldetail/${item.schoolId}`}
                        className="view"
                        title="View"
                        cshools-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE417;</i>
                      </a>
                      <a
                        href={`home/schooldetail/${item.schoolId}`}
                        className="edit"
                        title="Edit"
                        cshools-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE254;</i>
                      </a>
                      <Link
                        onClick={() => del(item.schoolId)}
                        //href=" "
                        className="delete"
                        title="Delete"
                        cshools-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE872;</i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
