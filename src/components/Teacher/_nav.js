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
    name: "LỚP",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Danh sách lớp",
        to: "/teacher/class",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "LỊCH",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Thời khóa biểu",
        to: "/teacher/calendar",
      },
      {
        component: CNavItem,
        name: "Lịch",
        to: "/teacher/meeting",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "NHẬP ĐIỂM",
    to: "#",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Nhập điểm",
        to: "/teacher/inputScore",
      },
    ],
  },
];

export default _nav;
