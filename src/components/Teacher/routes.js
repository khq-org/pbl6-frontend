import Profile from "./Profile";
import ChangePW from "../SchoolAdmin/ChangePW";
import Calendar from "./Calendar";
import Exam from "./Exam";
import Meeting from "./Meeting";
import InputScore from "./InputScore";
import Class from "./class";
const routes = [
  { path: "/profile", exact: true, name: "" },
  {
    path: "/profile",
    name: "Thông tin tài khoản",
    element: Profile,
  },
  {
    path: "/teacher/profile",
    name: "Thông tin tài khoản",
    element: Profile,
  },
  {
    path: "/pw",
    name: "Mật khẩu",
    element: ChangePW,
  },
  {
    path: "/teacher/pw",
    name: "Mật khẩu",
    element: ChangePW,
  },
  {
    path: "/calendar",
    name: "Thời khóa biểu",
    element: Calendar,
  },
  {
    path: "/teacher/calendar",
    name: "Thời khóa biểu",
    element: Calendar,
  },
  {
    path: "/exam",
    name: "Tạo lịch kiểm tra",
    element: Exam,
  },
  {
    path: "/teacher/exam",
    name: "Tạo lịch kiểm tra",
    element: Exam,
  },
  {
    path: "/meeting",
    name: "Lịch họp",
    element: Meeting,
  },
  {
    path: "/teacher/meeting",
    name: "Lịch họp",
    element: Meeting,
  },
  {
    path: "/inputScore",
    name: "Nhập điểm",
    element: InputScore,
  },
  {
    path: "/teacher/inputScore",
    name: "Nhập điểm",
    element: InputScore,
  },
  {
    path: "/teacher/class",
    name: "Danh sách lớp",
    element: Class,
  },
  {
    path: "/class",
    name: "Danh sách lớp",
    element: Class,
  },
];

export default routes;
