import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Calendar2 from "./components/Calendar";
import Modal from "./components/Modal";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
const attendees = [
  {
    id: "1",
    name: "Vishakh",
  },
  {
    id: "2",
    name: "Bhumika",
  },
];
const schedules = [
  // {
  //   id: "1",
  //   title: "Testing",
  //   calendarId: "1",
  //   category: "time",
  //   attendees: ["Vishakh"],
  //   isVisible: true,
  //   start,
  //   end
  // }
];

const colors = [
  {
    id: "1",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F",
  },
  {
    id: "2",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A",
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C",
  },
  {
    id: "5",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D",
  },
];

const calendars = [
  {
    id: "1",
    name: "Bridge",
  },
  {
    id: "2",
    name: "Tower",
  },
  {
    id: "3",
    name: "Ship",
  },
  // {
  //   id: "4",
  //   name: "Project 4"
  // },
  // {
  //   id: "5",
  //   name: "Project 5"
  // }
];

export default function Calendar() {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  function onBeforeCreateSchedule(event) {
    // console.log('onBeforeCreateSchedule', event)
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
    // call api
    const result = true;

    if (result) {
      const newSchedule = {
        ...event,
        id: schedules.length,
        title: newEvent.title,
        calendarId: newEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: newEvent.attendees,
        isVisible: true,
        start: newEvent.start,
        end: newEvent.end,
        details: newEvent.details,
        client: newEvent.client,
        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: newEvent.location,
        // raw: {
        //   class: event.raw["class"]
        // },
        state: event.state,
        body: event.body,
      };

      childRef.current.createSchedule(newSchedule);
      setModal(false);
    }
  }

  function onBeforeUpdateSchedule(event) {
    // console.log('onBeforeUpdateSchedule', event)

    const { schedule, changes } = event;

    // resize & drag n drop
    if (changes) {
      // call api
      const result = true;
      if (result) {
        return childRef.current.updateSchedule(schedule, changes);
      }
    }

    setModal(true);
    setEvent(event);
  }

  async function handleUpdateSchedule(updateEvent) {
    // call api
    const result = true;

    if (result) {
      const { schedule } = event;

      // way 1: library not support
      // update api fail with attendees
      // childRef.current.updateSchedule(schedule, updateEvent)

      // way 2: stupid
      await childRef.current.deleteSchedule(schedule);

      const newSchedule = {
        ...event,
        id: schedules.length + 2,
        title: updateEvent.title,
        calendarId: updateEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: updateEvent.attendees,
        isVisible: true,
        start: updateEvent.start,
        end: updateEvent.end,
        details: updateEvent.details,
        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: updateEvent.location,
        // raw: {
        //   class: event.raw["class"]
        // },
        state: event.state,
        body: event.body,
      };

      await childRef.current.createSchedule(newSchedule);

      setModal(false);
    }
  }

  function onBeforeDeleteSchedule(event) {
    // console.log('onBeforeDeleteSchedule', event)

    // call api
    const result = true;

    if (result) {
      const { schedule } = event;
      childRef.current.deleteSchedule(schedule);
    }

    return true;
  }

  const formatCalendars = calendars.map((element) => ({
    ...colors.find((element2) => element2.id === element.id),
    ...element,
  }));

  return (
    <div>
      <Calendar2
        ref={childRef}
        {...{
          isReadOnly: false,
          showSlidebar: false,
          showMenu: true,
          useCreationPopup: false,
          calendars: formatCalendars,
          schedules,
          onBeforeCreateSchedule,
          onBeforeUpdateSchedule,
          onBeforeDeleteSchedule,
        }}
      />
      <Modal
        {...{
          isOpen: modal,
          toggle,
          onSubmit:
            event?.triggerEventName === "mouseup"
              ? handleCreateSchedule
              : handleUpdateSchedule,
          submitText: event?.triggerEventName === "mouseup" ? "Save" : "Update",
          calendars: formatCalendars,
          attendees,

          schedule: event?.schedule,
          startDate: event?.start,
          endDate: event?.end,
        }}
      />
    </div>
  );
}
