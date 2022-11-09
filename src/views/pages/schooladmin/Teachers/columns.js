import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "userId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Họ tên",
    Footer: "Họ tên",
    accessor: "displayName",
    sticky: "left",
  },

  {
    Header: "Ngày sinh",
    Footer: "Ngày sinh",
    accessor: "dateOfBirth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Giới tính",
    Footer: "Giới tính",
    accessor: "gender",
    Cell: ({ value }) => {
      return value ? "Nam" : "Nữ";
    },
  },
  {
    Header: "Số nhà",
    Footer: "Số nhà",
    accessor: "street",
    sticky: "left",
  },

  {
    Header: "Quận/Huyện",
    Footer: "Quận/Huyện",
    accessor: "district",
    sticky: "left",
  },
  {
    Header: "Tỉnh/Thành phố",
    Footer: "Tỉnh/Thành phố",
    accessor: "city",
    sticky: "left",
  },
  {
    Header: "Chức vụ",
    Footer: "Chức vụ",
    accessor: "workingPosition",
    sticky: "left",
  },
  {
    Header: "Số điện thoại",
    Footer: "Số điện thoại",
    accessor: "phone",
    sticky: "left",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
