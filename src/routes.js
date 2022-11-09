import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const AllStudents = React.lazy(() => import("./views/students/AllStudents"));
const AllTeachers = React.lazy(() => import("./views/teachers/AllTeachers"));
const Info = React.lazy(() => import("./views/pages/schooladmin/InfoAdmin"));
const Password = React.lazy(() => import("./views/pages/schooladmin/ChangePW"));
const School = React.lazy(() => import("./views/pages/schooladmin/School"));

const routes = [
  { path: "/dashboard", exact: true, name: "" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  {
    path: "/students",
    name: "Học Sinh",
    element: AllStudents,
    exact: true,
  },
  {
    path: "/students/all-students",
    name: "Danh sách học sinh",
    element: AllStudents,
  },

  {
    path: "/teachers",
    name: "Giáo viên",
    element: AllTeachers,
    exact: true,
  },
  {
    path: "/teachers/all-teachers",
    name: "Danh sách giáo viên",
    element: AllTeachers,
  },
  { path: "/info", name: "Thông tin tài khoản", element: Info },
  { path: "/changepw", name: "Đổi mật khẩu", element: Password },
  { path: "/school", name: "Thông tin trường", element: School },
];

export default routes;
