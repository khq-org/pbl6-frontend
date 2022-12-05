import React from "react";
const Profile = React.lazy(() => import("./Profile"));
const ChangePW = React.lazy(() => import("./password"));

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
];

export default routes;
