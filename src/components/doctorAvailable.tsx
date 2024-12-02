import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  CancelIcon,
  SaveIcon,
  TimeIcon,
  WarningIcon,
} from "@/icons/page";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

import Select from "./select";
import { times } from "@/utils/option";
import { IDoctorAppointmentTypes, IDoctorSchedulesTypes } from "@/types/doctor";
import IconButton from "./iconButton";
import { calculateCustomTimeSlots } from "@/utils/timeCalculate";
import { useFetchDoctorPublicById } from "@/lib/doctor/useFetchSchadule";

interface TimeSlot {
  label: string;
  value: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type DoctorAvailableProps = {
  id: string;
  onSave: (
    selectedSlots: string[],
    formattedDate: string,
    scheduleId: string
  ) => void; // Specify types for the parameters
  onClose: () => void;
};

export default function DoctorAvailable({
  id,
  onSave,
  onClose,
}: DoctorAvailableProps): React.JSX.Element {
  const { data } = useFetchDoctorPublicById({ id: id });
  const [time, setTime] = useState<number>(10);
  const [value, setValue] = useState<Value | null>(null);
  const [value1, setValue1] = useState<Value | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [timeSlots1, setTimeSlots1] = useState<TimeSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [scheduleId, setScheduleId] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");

  const availableDates = Array.isArray(data?.schedules)
    ? data.schedules.map((schedule: IDoctorSchedulesTypes) => ({
        date: new Date(schedule.date),
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        scheduleId: schedule.id,
        selectDate: schedule.date,
      }))
    : [];

  const appointmentDates = Array.isArray(data?.appointments)
    ? data.appointments.map((schedule: IDoctorAppointmentTypes) => ({
        date: new Date(schedule.date),
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        scheduleId: schedule.id,
        selectDate: schedule.date,
      }))
    : [];

  const recalculateTimeSlots = (selectedDate: Value) => {
    const selectedDateString = (selectedDate as Date).toDateString();

    const availableDateSlots = availableDates.filter(
      (availableDate) =>
        availableDate.date.toDateString() === selectedDateString
    );

    if (availableDateSlots.length === 0) {
      setTimeSlots([]);
      return;
    }

    let allTimeSlots: TimeSlot[] = [];

    availableDateSlots.forEach((slot) => {
      const newTimeSlots = calculateCustomTimeSlots(
        slot.startTime,
        slot.endTime,
        time
      );
      allTimeSlots = [...allTimeSlots, ...newTimeSlots];
    });

    setTimeSlots(allTimeSlots);
  };

  const recalculateTimeSlots1 = (selectedDate: Value) => {
    const selectedDateString = (selectedDate as Date).toDateString();

    const appointmentDateSlots = appointmentDates.filter(
      (appointmentDate) =>
        appointmentDate.date.toDateString() === selectedDateString
    );

    if (appointmentDateSlots.length === 0) {
      setTimeSlots1([]);
      return;
    }

    let allTimeSlots: TimeSlot[] = [];

    appointmentDateSlots.forEach((slot) => {
      const newTimeSlots = calculateCustomTimeSlots(
        slot.startTime,
        slot.endTime,
        5
      );
      allTimeSlots = [...allTimeSlots, ...newTimeSlots];
    });

    setTimeSlots1(allTimeSlots);
  };

  useEffect(() => {
    if (availableDates.length > 0 && !value) {
      setValue(availableDates[0].date);
    }
  }, [availableDates, value]);

  useEffect(() => {
    if (appointmentDates.length > 0 && !value) {
      setValue1(appointmentDates[0].date);
    }
  }, [appointmentDates, value]);

  useEffect(() => {
    if (value) {
      recalculateTimeSlots(value);
    }
  }, [time, value]);

  useEffect(() => {
    if (value1) {
      recalculateTimeSlots1(value1);
    }
  }, [time, value1]);

  const handleDateChange = (selectedDate: Value) => {
    setValue(selectedDate);
    setValue1(selectedDate);
  };

  const toggleTimeSlot = (label: string) => {
    setSelectedTimeSlots((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((slot) => slot !== label)
        : [...prevSelected, label]
    );

    // Find and set scheduleId for the selected time slot
    const selectedSlot = availableDates.find((slot) =>
      calculateCustomTimeSlots(slot.startTime, slot.endTime, time).some(
        (generatedSlot) => generatedSlot.label === label
      )
    );

    if (selectedSlot) {
      setScheduleId(selectedSlot.scheduleId);
      setDate(selectedSlot?.selectDate);
    }
  };

  const handleSave = () => {
    onSave(selectedTimeSlots, date, scheduleId); // Send selected time slots back to the parent
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const isAvailable = availableDates.some(
        (availableDate) =>
          availableDate.date.getFullYear() === date.getFullYear() &&
          availableDate.date.getMonth() === date.getMonth() &&
          availableDate.date.getDate() === date.getDate()
      );

      if (isAvailable) {
        return "highlight";
      }
    }
    return null;
  };

  const formattedDate = value
    ? (value as Date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="w-full flex items-center justify-center flex-col text-b_text pt-0 pb-2 sm:py-3 px-0 sm:px-2 gap-2">
      <div className="hidden sm:block w-full flex items-center justify-center flex-col sm:border-b py-2">
        <strong>Doctor name</strong>
        <p>These are all the available time options</p>
      </div>
      <div className="px-2 w-full flex flex-col lg:flex-row items-start justify-between gap-2">
        <div className="w-full sm:w-1/2 sm:border-r flex items-center justify-start flex-col gap-2 py-4">
          <div className="flex items-start justify-start gap-2">
            <CalendarIcon />
            <h4 className="text-b_text text-sm mb-1 sm:mb-3 font-bold">
              Choose an appointment date:
            </h4>
          </div>
          <div className="flex items-center justify-center w-full paokue">
            <Calendar
              onChange={handleDateChange}
              value={value}
              tileClassName={tileClassName}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-start flex-col gap-2 py-1 sm:py-4">
          {timeSlots.length > 0 ? (
            <div className="w-full">
              {formattedDate && (
                <div className="w-full flex items-center justify-center text-sm font-semibold">
                  <TimeIcon size={20} />
                  &nbsp; {formattedDate}
                </div>
              )}
              <div className="w-full flex items-start justify-start flex-col gap-4">
                <Select
                  name="time"
                  title="Select time"
                  option={times}
                  className="h-8"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                />
                <div className="grid grid-cols-2 gap-2 cursor-pointer w-full max-h-56 overflow-scroll">
                  {timeSlots.map((slot: TimeSlot, index: number) => {
                    const [slotStartTime, slotEndTime] =
                      slot.label.split(" - ");

                    // Check if this slot overlaps with any slot in timeSlots1 (booked slots)
                    const isBooked = timeSlots1.some((bookedSlot) => {
                      const [bookedStartTime, bookedEndTime] =
                        bookedSlot.label.split(" - ");
                      return doesOverlap(
                        slotStartTime,
                        slotEndTime,
                        bookedStartTime,
                        bookedEndTime
                      );
                    });

                    return (
                      <p
                        key={index + 1}
                        id="badge-dismiss-default"
                        onClick={
                          !isBooked
                            ? () => toggleTimeSlot(slot.label)
                            : undefined
                        }
                        className={`flex items-center justify-center px-2 py-1 text-xs font-medium rounded-lg border ${
                          selectedTimeSlots.includes(slot.label)
                            ? "bg-secondary text-white"
                            : isBooked
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed" // Style for disabled (booked) slots
                            : "text-b_text"
                        }`}
                      >
                        {slot.label}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-2">
                <IconButton
                  className="rounded text-base w-full mt-2 sm:mt-4 border text-xs"
                  icon={<CancelIcon />}
                  isFront={true}
                  type="button"
                  title="Close"
                  onClick={() => onClose()}
                />
                <IconButton
                  className="rounded text-white bg-base w-full mt-2 sm:mt-4 text-xs"
                  icon={<SaveIcon size={18} />}
                  isFront={true}
                  title="Save"
                  type="button"
                  onClick={handleSave} // Trigger save action on click
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-4">
              <WarningIcon size={22} className="text-error" />
              <p className="text-xs text-error">
                Doctor not available on {formattedDate}!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function parseTime(timeString: string): Date {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // Set seconds and milliseconds to 0
  return date;
}

function doesOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const startTime1 = parseTime(start1);
  const endTime1 = parseTime(end1);
  const startTime2 = parseTime(start2);
  const endTime2 = parseTime(end2);

  return startTime1 < endTime2 && endTime1 > startTime2;
}
