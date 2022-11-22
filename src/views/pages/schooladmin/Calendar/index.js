import React from "react";
import axios from "axios";
import { CFormSelect, CForm } from "@coreui/react";

const Calendar = () => {
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        Năm học:
        <CFormSelect className="form-control form-control-sm mr-3 w-25"></CFormSelect>
        Lớp:
        <CFormSelect className="form-control form-control-sm mr-3 w-25"></CFormSelect>
      </div>
    </>
  );
};

export default Calendar;
