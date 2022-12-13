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
  { path: "/dashboard", exact: true, name: "" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/startnewyear", name: "Bắt đầu năm học mới", element: StartNewYear },

  {
    path: "/all-students",
    name: "Danh sách học sinh",
    element: AllStudents,
  },

  {
    path: "/all-students/:id",
    name: "Hồ sơ học sinh",
    element: StudentDetail,
  },
  {
    path: "/all-students/:id",
    name: "Hồ sơ học sinh",
    element: StudentDetail,
  },
  {
    path: "/all-students/student",
    name: "Thêm mới học sinh",
    element: CreateStudent,
  },

  {
    path: "/all-teachers",
    name: "Danh sách giáo viên",
    element: AllTeachers,
  },
  {
    path: "/all-teachers/:id",
    name: "Thông tin giáo viên",
    element: TeacherDetail,
  },

  {
    path: "/classes",
    name: "Danh sách lớp",
    element: Class,
  },
  {
    path: "/classes/:id",
    name: "Thông tin lớp",
    element: ClassDetail,
  },
  {
    path: "/calendar",
    name: "Thời khóa biểu",
    element: Calendar,
  },
  {
    path: "/exam",
    name: "Lịch ",
    element: Exam,
  },
  { path: "/info", name: "Thông tin tài khoản", element: InfoAdmin },
  { path: "/changepw", name: "Đổi mật khẩu", element: ChangePW },
  { path: "/school", name: "Thông tin trường", element: School },
];

export default routes;
