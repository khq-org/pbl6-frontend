import React from "react";
import { Link } from "react-router-dom";

import { PaginationTable } from "./PaginationTable";

const AllTeachers = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Danh sách thông tin giáo viên</h1>
      <PaginationTable />
    </>
  );
};

export default AllTeachers;