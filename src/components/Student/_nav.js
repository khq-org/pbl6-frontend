import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavGroup,
    name: "HỌC SINH",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Hồ sơ",
        to: "/student/studentdetail",
      },
      {
        component: CNavItem,
        name: "Kết quả học tập",
        to: "/student/learningresult",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "LỊCH HỌC VÀ THI",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Thời khóa biểu",
        to: "/student/calendar",
      },
      {
        component: CNavItem,
        name: "Lịch thi",
        to: "/student/exam",
      },
    ],
  },
];

export default _nav;
