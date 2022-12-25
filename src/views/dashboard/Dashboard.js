import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CAvatar,
  CImage,
} from "@coreui/react";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload } from "@coreui/icons";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";

const Dashboard = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [classes, setclasses] = useState(0);
  const [teachers, setteachers] = useState(0);
  const [students, setstudents] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("teachers");
        setteachers(data.data.totalItems);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("students");
        setstudents(data.data.totalItems);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("classes");
        setclasses(data.data.totalItems);
      } catch (e) {}
    })();
  }, []);

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const progressExample = [
    { title: "Visits", value: "29.703 Users", percent: 40, color: "success" },
    { title: "Unique", value: "24.093 Users", percent: 20, color: "info" },
    {
      title: "Pageviews",
      value: "78.706 Views",
      percent: 60,
      color: "warning",
    },
    { title: "New Users", value: "22.123 Users", percent: 80, color: "danger" },
    {
      title: "Bounce Rate",
      value: "Average Rate",
      percent: 40.15,
      color: "primary",
    },
  ];

  return (
    <>
      <CRow>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                <tr>
                  <td style={{ fontSize: "50px" }}>{classes}</td>
                  <td>
                    <div className="m-5">
                      <i>
                        <CAvatar
                          src="https://png.pngtree.com/png-vector/20190723/ourlarge/pngtree-classroom-icon-for-your-project-png-image_1571714.jpg"
                          style={{ width: "150px", hight: "150px" }}
                        />
                      </i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>LỚP HỌC</td>
                  <td></td>
                </tr>
              </>
            }
            title=""
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  <CIcon
                    icon={cilOptions}
                    className="text-high-emphasis-inverse"
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/classes">Chi tiết</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="text-center mb-4"
            color="info"
            value={
              <>
                <tr>
                  <td style={{ fontSize: "50px" }}>{students}</td>
                  <td>
                    <div className="m-5">
                      <i>
                        <CAvatar
                          src="https://png.pngtree.com/element_our/png_detail/20181129/male-student-icon-png_251938.jpg"
                          style={{ width: "150px", hight: "150px" }}
                        />
                      </i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>HỌC SINH</td>
                  <td></td>
                </tr>

                {/* <span className="fs-6 fw-normal">
                  (40.9% <CIcon icon={cilArrowTop} />)
                </span> */}
              </>
            }
            title=""
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  {/* <img
                    src="https://png.pngtree.com/png-vector/20190326/ourlarge/pngtree-vector-male-student-icon-png-image_864721.jpg"
                    style={{ width: "90px", hight: "90px" }}
                  ></img> */}
                  <CIcon
                    icon={cilOptions}
                    className="text-high-emphasis-inverse"
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/all-students">Chi tiết</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={
              <>
                <tr>
                  <td style={{ fontSize: "50px" }}>{teachers}</td>
                  <td>
                    <div className="m-5">
                      <i>
                        <CAvatar
                          src="https://cdn-icons-png.flaticon.com/512/206/206897.png"
                          style={{ width: "150px", hight: "150px" }}
                        />
                      </i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>GIÁO VIÊN</td>
                  <td></td>
                </tr>
              </>
            }
            title=""
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  <CIcon
                    icon={cilOptions}
                    className="text-high-emphasis-inverse"
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/all-teachers">Chi tiết</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
          />
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CImage
            src="https://educloud.app/lms/src/erp/smp_i3.png"
            style={{ width: "100%" }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
