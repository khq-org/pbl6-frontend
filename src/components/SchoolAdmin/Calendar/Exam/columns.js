import { format } from "date-fns";
var mapSubjects = {
  Biological: "Sinh học",
  Chemistry: "Hóa học",
  Civic_Education: "Giáo dục công dân",
  Defense_Education: "Giáo dục quốc phòng",
  English: "Tiếng Anh",
  Geographic: "Địa lý",
  History: "Lịch Sử",
  Informatics: "Tin học",
  Literature: "Ngữ văn",
  Maths: "Toán học",
  Physic: "Vật lý",
  Physical_Education: "Thể dục",
  Technology: "Công nghệ",
};

export const COLUMNS = [
  {
    Header: "Id",

    accessor: "calendarEventId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Lịch",

    accessor: "calendarEvent",
    sticky: "left",
  },

  {
    Header: "Ngày",

    accessor: "calendarDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Bắt đầu",

    accessor: "timeStart",
  },
  {
    Header: "Kết thúc",

    accessor: "timeFinish",
    sticky: "left",
  },
  {
    Header: "Phòng",

    accessor: "roomName",
  },
  {
    Header: "Thành phần tham dự",

    accessor: "teacher.lastName",
  },
  {
    Header: "Môn thi(Lịch thi)",

    accessor: "subjectName",

    Cell: ({ value }) => {
      return mapSubjects[value?.replace(" ", "_")];
    },
  },
];
