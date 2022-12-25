export const COLUMNS = [
  {
    Header: "Họ tên",

    accessor: "displayName",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Toán",

    accessor: "arrAvgSubjectScore[0]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Lí",

    accessor: "arrAvgSubjectScore[1]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Hóa",

    accessor: "arrAvgSubjectScore[2]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Sinh",

    accessor: "arrAvgSubjectScore[6]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Anh",

    accessor: "arrAvgSubjectScore[7]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Văn",

    accessor: "arrAvgSubjectScore[3]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Sử",

    accessor: "arrAvgSubjectScore[4]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Địa",

    accessor: "arrAvgSubjectScore[5]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "GDCD",

    accessor: "arrAvgSubjectScore[8]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Tin",

    accessor: "arrAvgSubjectScore[12]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "QP AN",

    accessor: "arrAvgSubjectScore[10]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "CN",

    accessor: "arrAvgSubjectScore[9]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Thể dục",

    accessor: "arrAvgSubjectScore[11]",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },

  {
    Header: "HKI",

    accessor: "avgSemesterI",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "HKII",

    accessor: "avgSemesterII",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Cả năm",

    accessor: "avgSchoolYear",
    sticky: "left",
    Cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Học lực",

    accessor: "learningGrade",
    sticky: "left",
  },
  {
    Header: "Hạnh kiểm",

    accessor: "conduct",
    sticky: "left",
  },
  {
    Header: "Xếp loại",

    accessor: "",
    sticky: "left",
  },

  {
    Header: "Lên lớp",

    accessor: "",
    sticky: "left",
  },
];
