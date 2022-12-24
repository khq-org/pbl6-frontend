import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "classId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Tên lớp",
    Footer: "Tên lớp",
    accessor: "clazz",
    sticky: "left",
  },

  {
    Header: "Khối",
    Footer: "Khối",
    accessor: "grade.grade",
    sticky: "left",
  },
];
