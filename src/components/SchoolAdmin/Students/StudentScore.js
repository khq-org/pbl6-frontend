import React from "react";
import "./table.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const StudentScore = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`students/${id}`);
        console.log({ data });
      } catch (e) {}
    })();
  }, []);

  return (
    <>
      <div> score</div>
    </>
  );
};

export default StudentScore;
