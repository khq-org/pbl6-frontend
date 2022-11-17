import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const ClassDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [className, setclassName] = useState("");
  const [gradeId, setgradeId] = useState(0);
  const [isSpecializedClass, setisSpecializedClass] = useState(false);
  const [subject, setsubject] = useState("");
  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`classes/${id}`);
        console.log({ data });
        setclassName(data.data.clazz);
        setgradeId(data.data.grade.gradeId);
        setisSpecializedClass(data.data.specializedClass);
        setsubject(data.data.subject);
      } catch (e) {}
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(`classes/${id}`, {});
    alert("done.");
  };
  return (
    <>
      <h2 className="text-center"> Thông tin lớp</h2>
      <div className="container rounded bg-white mt-2 mb-2">
        <form onSubmit={save}>
          <div className="col">
            <div className="">
              <div className="row mt-3">
                <div className="col-md-12">
                  Tên lớp
                  <input
                    type="text"
                    className="form-control"
                    value={className}
                    onChange={(e) => setclassName(e.target.value)}
                  />
                </div>

                <div className="col-md-12">
                  Khối
                  <CFormSelect
                    value={gradeId}
                    onChange={(e) => setgradeId(e.target.value)}
                  >
                    <option value={1} label="10"></option>
                    <option value={2} label="11"></option>
                    <option value={3} label="12"></option>
                  </CFormSelect>
                </div>
                <div className="col-md-12">
                  Loại lớp
                  <CFormSelect
                    value={isSpecializedClass}
                    onChange={(e) => setisSpecializedClass(e.target.value)}
                  >
                    <option value={true} label="Lớp chọn"></option>
                    <option value={false} label="Lớp bình thường"></option>
                  </CFormSelect>
                </div>
                <div className="col-md-12">
                  Môn học
                  <input
                    type="text"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setsubject(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button className="btn btn-primary " type="submit">
                  Lưu thông tin
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ClassDetail;
