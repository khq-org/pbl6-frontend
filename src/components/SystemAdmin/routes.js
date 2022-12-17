import { Home } from "./Home/index";
import { InfoAdmin } from "./InfoAdmin";
import ChangePW from "../SchoolAdmin/ChangePW";
import { SchoolDetail } from "./SchoolDetail";
import { CreateSchool } from "./CreateSchool";
import { AdminSchoolDetail } from "./AdminSchoolDetail";
{
  /* <Route path="home" element={<Home />} />
        <Route path="info" element={<InfoAdmin />} />
        <Route path="changepassword" element={<ChangePW />} />
        <Route path="home/schooldetail/:id" element={<SchoolDetail />} />
        <Route
          path="home/schooldetail/:id/adminschooldetail/:id"
          element={<AdminSchoolDetail />}
        />
        <Route path="home/create" element={<CreateSchool />} /> */
}
const routes = [
  { path: "/home", exact: true, name: "" },
  {
    path: "/home",
    name: "Trang chủ",
    element: Home,
  },
  {
    path: "/info",
    name: "Thông tin tài khoản",
    element: InfoAdmin,
  },
  {
    path: "/changepassword",
    name: "Đổi mật khẩu",
    element: ChangePW,
  },

  {
    path: "/home/schooldetail/:id",
    name: "Thông tin trường học",
    element: SchoolDetail,
  },
  {
    path: "/home/schooldetail/:id/adminschooldetail/:id",
    name: "Tài khoản quản trị viên",
    element: AdminSchoolDetail,
  },

  {
    path: "/home/create",
    name: "Tạo mới trường học",
    element: CreateSchool,
  },
  //
  { path: "/admin/home", exact: true, name: "" },
  {
    path: "/home",
    name: "Trang chủ",
    element: Home,
  },
  {
    path: "/admin/info",
    name: "Thông tin tài khoản",
    element: InfoAdmin,
  },
  {
    path: "/admin/changepassword",
    name: "Đổi mật khẩu",
    element: ChangePW,
  },

  {
    path: "/admin/home/schooldetail/:id",
    name: "Thông tin trường học",
    element: SchoolDetail,
  },
  {
    path: "/admin/home/schooldetail/:id/adminschooldetail/:id",
    name: "Tài khoản quản trị viên",
    element: AdminSchoolDetail,
  },

  {
    path: "/admin/home/create",
    name: "Tạo mới trường học",
    element: CreateSchool,
  },
];

export default routes;
