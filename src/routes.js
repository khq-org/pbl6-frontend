//import React from "react";
import StartNewYear from "./components/SchoolAdmin/System";
import AllStudents from "./components/SchoolAdmin/Students";
import AllTeachers from "./components/SchoolAdmin/Teachers";
import InfoAdmin from "./components/SchoolAdmin/InfoAdmin";
import ChangePW from "./components/SchoolAdmin/ChangePW";
import School from "./components/SchoolAdmin/School";
import TeacherDetail from "./components/SchoolAdmin/Teachers/TeacherDetail";
import ClassDetail from "./components/SchoolAdmin/class/ClassDetail";
import StudentDetail from "./components/SchoolAdmin/Students/StudentDetail";
import CreateStudent from "./components/SchoolAdmin/Students/CreateStudent";
import Class from "./components/SchoolAdmin/class";
import Calendar from "./components/SchoolAdmin/Calendar";
import Exam from "./components/SchoolAdmin/Calendar/Exam";
import Dashboard from "./views/dashboard/Dashboard";
import StudentScore from "./components/SchoolAdmin/Students/StudentScore";
// const StartNewYear = React.lazy(() =>
//   import("./components/SchoolAdmin/System")
// );
// const AllStudents = React.lazy(() =>
//   import("./components/SchoolAdmin/Students")
// );
// const AllTeachers = React.lazy(() =>
//   import("./components/SchoolAdmin/Teachers")
// );
// const Info = React.lazy(() => import("./components/SchoolAdmin/InfoAdmin"));
// const Password = React.lazy(() => import("./components/SchoolAdmin/ChangePW"));
// const School = React.lazy(() => import("./components/SchoolAdmin/School"));
// const TeacherDetail = React.lazy(() =>
//   import("./components/SchoolAdmin/Teachers/TeacherDetail")
// );
// const ClassDetail = React.lazy(() =>
//   import("./components/SchoolAdmin/class/ClassDetail")
// );
// const StudentDetail = React.lazy(() =>
//   import("./components/SchoolAdmin/Students/StudentDetail")
// );
// const CreateStudent = React.lazy(() =>
//   import("./components/SchoolAdmin/Students/CreateStudent")
// );
// const Class = React.lazy(() => import("./components/SchoolAdmin/class"));
// const Calendar = React.lazy(() => import("./components/SchoolAdmin/Calendar"));
// const Exam = React.lazy(() =>
//   import("./components/SchoolAdmin/Calendar/Exam")
// );
// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const routes = [
  { path: "/dashboard", exact: true, name: "Dashboard" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/startnewyear", name: "B???t ?????u n??m h???c m???i", element: StartNewYear },

  {
    path: "/all-students",
    name: "Danh s??ch h???c sinh",
    element: AllStudents,
  },

  {
    path: "/all-students/score/:id",
    name: "K???t qu??? h???c t???p h???c sinh",
    element: StudentScore,
  },
  {
    path: "/all-students/:id",
    name: "H??? s?? h???c sinh",
    element: StudentDetail,
  },
  {
    path: "/all-students/student",
    name: "Th??m m???i h???c sinh",
    element: CreateStudent,
  },

  {
    path: "/all-teachers",
    name: "Danh s??ch gi??o vi??n",
    element: AllTeachers,
  },
  {
    path: "/all-teachers/:id",
    name: "Th??ng tin gi??o vi??n",
    element: TeacherDetail,
  },

  {
    path: "/classes",
    name: "Danh s??ch l???p",
    element: Class,
  },
  {
    path: "/classes/:id",
    name: "Th??ng tin l???p",
    element: ClassDetail,
  },
  {
    path: "/calendar",
    name: "Th???i kh??a bi???u",
    element: Calendar,
  },
  {
    path: "/exam",
    name: "L???ch ",
    element: Exam,
  },
  { path: "/info", name: "Th??ng tin t??i kho???n", element: InfoAdmin },
  { path: "/changepw", name: "?????i m???t kh???u", element: ChangePW },
  { path: "/school", name: "Th??ng tin tr?????ng", element: School },
];

export default routes;
