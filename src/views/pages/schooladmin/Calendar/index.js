import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Control from "./Control";
import Form from "./Form";
import ListEvent from "./ListEvent";
const convertDate = (info) => {
  let start = new Date(info.event.start);
  let end = new Date(info.event.end);
  const eventUpdate = {
    title: info.event.title,
    start: start.toISOString(),
    end: end.toISOString(),
    id: info.event.id,
    allDay: info.event.allDay,
  };
  return eventUpdate;
};
class Calendar extends React.Component {
  calendarRef = React.createRef();
  state = {
    Events: [],
    eventUpdate: {},
    isShowForm: false,
    isShowListEvent: false,
    infoDateClick: undefined,
  };

  eventDragStop = (info) => {
    // // const Events = Object.assign([], this.state.Events);
    // let Events = JSON.parse(JSON.stringify(this.state.Events))
    // const event = convertDate(info);
    // const index = Events.findIndex((Event) => Event.id === event.id);
    // console.log(index)
    // Events.splice(index, 1, event);
    // this.setState({
    //   Events: Object.assign([], Events)
    // })
  };
  handleDateClick = (infoDateClick) => {
    this.setState({
      eventUpdate: {},
      isShowForm: true,
      infoDateClick,
    });
  };
  handleEventClick = (infoEventClick) => {
    const eventUpdate = convertDate(infoEventClick);
    console.log(eventUpdate);
    this.setState({
      eventUpdate: { ...eventUpdate },
      isShowForm: true,
    });
  };
  onClick = (name) => {
    switch (name) {
      case "add": {
        this.setState({
          isShowForm: !this.state.isShowForm,
          eventUpdate: {},
        });
        break;
      }
      case "event": {
        this.setState({
          isShowListEvent: !this.state.isShowListEvent,
        });
        break;
      }
      default:
    }
  };
  onSubmit = (eventFromChild) => {
    let Events = JSON.parse(JSON.stringify(this.state.Events));
    if (this.state.eventUpdate.id) {
      const index = Events.findIndex((event) => event.id === eventFromChild.id);
      Events.splice(index, 1, eventFromChild);
      this.setState({
        Events,
        isShowForm: false,
        eventUpdate: {},
        infoDateClick: undefined,
      });
    } else {
      Events.push(eventFromChild);
      this.setState({
        Events: Events,
        isShowForm: false,
        infoDateClick: undefined,
      });
    }
  };
  deleteEvent = (id) => {
    let Events = JSON.parse(JSON.stringify(this.state.Events));
    const index = Events.findIndex((event) => event.id === id);
    Events.splice(index, 1);
    this.setState({
      Events,
    });
  };
  isUpdateEvent = (eventUpdate) => {
    this.setState({
      eventUpdate: { ...eventUpdate },
      isShowForm: true,
      infoDateClick: undefined,
    });
  };
  render() {
    let { isShowForm, isShowListEvent, Events, eventUpdate, infoDateClick } =
      this.state;

    return (
      <div className="Calendar">
        <Control onClick={this.onClick} />
        {isShowForm && (
          <Form
            onSubmit={this.onSubmit}
            infoDateClick={infoDateClick}
            eventUpdate={eventUpdate}
          />
        )}
        {isShowListEvent && (
          <ListEvent
            Events={Events}
            deleteEvent={this.deleteEvent}
            isUpdateEvent={this.isUpdateEvent}
          />
        )}
        <FullCalendar
          initialView="timeGridWeek"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          ref={this.calendarRef}
          events={Events}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          // eventDragStop={this.eventDragStop}
        />
      </div>
    );
  }
}

export default Calendar;

// import React from "react";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { INITIAL_EVENTS, createEventId } from "./event-utils";

// export default class Calendar extends React.Component {
//   state = {
//     weekendsVisible: true,
//     currentEvents: [],
//   };

//   render() {
//     return (
//       <div className="demo-Calendar">
//         {this.renderSidebar()}
//         <div className="demo-Calendar-main">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay",
//             }}
//             initialView="timeGridWeek"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//             select={this.handleDateSelect}
//             eventContent={renderEventContent} // custom render function
//             eventClick={this.handleEventClick}
//             eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//           />
//         </div>
//       </div>
//     );
//   }

//   renderSidebar() {
//     return (
//       <div className="demo-Calendar-sidebar">
//         <div className="demo-Calendar-sidebar-section">
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//         </div>
//       </div>
//     );
//   }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt("Please enter a new title for your event");
//     let calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay,
//         gv: "huan",
//       });
//     }
//   };

//   handleEventClick = (clickInfo) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${clickInfo.event.title}'`
//       )
//     ) {
//       clickInfo.event.remove();
//     }
//   };

//   handleEvents = (events) => {
//     this.setState({
//       currentEvents: events,
//     });
//   };
// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//       <i>{event.gv}</i>
//     </li>
//   );
// }
// import React from "react";
// import { CFormSelect } from "@coreui/react";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const Calendar = () => {
//   const token = localStorage.getItem("access_token");
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const [listclass, setlistclass] = useState([]);
//   const [listyear, setlistyear] = useState([]);
//   const [listteacher, setlistTeacher] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get("schoolyear");
//         //console.log(data);
//         setlistyear(data.data.items);
//         const res = await axios.get("classes");
//         setlistclass(res.data.data.items);
//       } catch (e) {}
//     })();
//   }, []);
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get("teachers");
//         //console.log({ data });
//         setlistTeacher(data.data.items);
//       } catch (e) {}
//     })();
//   }, []);
//   return (
//     <>
//       <div style={{ width: "100%", padding: "5px 2px 2px 2px" }}>
//         <div
//           classname="GreyBox"
//           style={{ marginRight: "auto", marginLeft: "auto" }}
//         >
//           <table className="table table-primary">
//             <tbody>
//               <tr>
//                 <td style={{ textAlign: "center", width: "7%" }}>Năm học:</td>
//                 <td>
//                   <CFormSelect>
//                     {listyear?.map((item) => (
//                       <option
//                         value={item.schoolYearId}
//                         label={item.schoolYear}
//                       ></option>
//                     ))}
//                   </CFormSelect>
//                 </td>
//                 <td style={{ textAlign: "center", width: "5%" }}>Lớp:</td>
//                 <td>
//                   <CFormSelect>
//                     {listclass?.map((items) => (
//                       <option
//                         value={items.classId}
//                         label={items.clazz}
//                       ></option>
//                     ))}
//                   </CFormSelect>
//                 </td>
//                 <td style={{ textAlign: "center", width: "50%" }}>
//                   Thời gian áp dụng: <input type="date" />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div style={{ width: "80%", padding: "5px 2px 2px 2px" }}>
//         <div
//           classname="GreyBox"
//           style={{ marginRight: "auto", marginLeft: "auto" }}
//         >
//           <div class="table-wrCalendarer-scroll-y my-custom-scrollbar">
//             <table className="table table-bordered table-active">
//               <tbody>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 2
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 3
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 4
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 5
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 6
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 7
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-5 text-center">
//             <button className="btn btn-primary profile-button" type="button">
//               Cập nhật
//             </button>
//           </div>
//         </div>
//         <br />
//         <br />
//       </div>
//     </>
//   );
// };

// export default Calendar;
