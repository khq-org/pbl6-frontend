import Profile from "./Profile";
import ChangePW from "./password";
import StudentDetail from "./StudentDetail";
import Calendar from "./Calendar";
import Exam from "./Exam";
import learningResults from "./Learningresult";
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
    name: "Hồ sơ học sinh",
    element: StudentDetail,
  },
  {
    path: "/calendar",
    name: "Thời khóa biểu",
    element: Calendar,
  },
  {
    path: "/exam",
    name: "Lịch thi",
    element: Exam,
  },
  {
    path: "/learningresult",
    name: "Kết quả học tập",
    element: learningResults,
  },
];

export default routes;
