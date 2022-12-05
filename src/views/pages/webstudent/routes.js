import React from "react";
const Profile = React.lazy(() => import("./Profile"));
const ChangePW = React.lazy(() => import("./password"));
const StudentDetail = React.lazy(() => import("./StudentDetail"));

const routes = [
  { path: "/profile", exact: true, name: "Thông tin tài khoản" },
  {
    path: "/profile",
    name: "Thông tin tài khoản",
    element: Profile,
  },
  {
    path: "/pw",
    name: "Mật khẩu",
    element: ChangePW,
  },
  {
    path: "/studentdetail",
    name: "Học bạ",
    element: StudentDetail,
  },
];

export default routes;
