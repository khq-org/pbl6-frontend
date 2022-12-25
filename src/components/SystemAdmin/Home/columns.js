import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Trường học",

    accessor: "school",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "ID",

    accessor: "schoolId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Số điện thoại",

    accessor: "phone",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Địa chỉ",

    accessor: "street",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Quận/Huyện",

    accessor: "district",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Tỉnh/Thành phố",

    accessor: "city",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Website",

    accessor: "website",
    disableFilters: true,
    sticky: "left",
  },
];
