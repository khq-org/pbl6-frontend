import { Home } from "./Home/index";
import { InfoAdmin } from "./InfoAdmin";
import { ChangePW } from "./ChangePW";
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
    name: "Home",
    element: Home,
  },
  {
    path: "/info",
    name: "Profile",
    element: InfoAdmin,
  },
  {
    path: "/changepassword",
    name: "Password",
    element: ChangePW,
  },

  {
    path: "/home/schooldetail/:id",
    name: "SchoolDetail",
    element: SchoolDetail,
  },
  {
    path: "/home/schooldetail/:id/adminschooldetail/:id",
    name: "Adminschooldetail",
    element: AdminSchoolDetail,
  },

  {
    path: "/home/create",
    name: "CreateSchool",
    element: CreateSchool,
  },
  //
  { path: "/admin/home", exact: true, name: "" },
  {
    path: "/admin/home",
    name: "Home",
    element: Home,
  },
  {
    path: "/admin/info",
    name: "Profile",
    element: InfoAdmin,
  },
  {
    path: "/admin/changepassword",
    name: "Password",
    element: ChangePW,
  },

  {
    path: "/admin/home/schooldetail/:id",
    name: "SchoolDetail",
    element: SchoolDetail,
  },
  {
    path: "/admin/home/schooldetail/:id/adminschooldetail/:id",
    name: "Adminschooldetail",
    element: AdminSchoolDetail,
  },

  {
    path: "/admin/home/create",
    name: "CreateSchool",
    element: CreateSchool,
  },
];

export default routes;
