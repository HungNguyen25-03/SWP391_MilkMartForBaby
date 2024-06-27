import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangeButton.scss";

const DateRangeButton = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date("2024-06-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-01"));
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="date-range-container">
      <div className="date-range-button" onClick={toggleDatePicker}>
        <span>
          {startDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}{" "}
          -{" "}
          {endDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </span>
        <span className="arrow">&#x25BC;</span>
      </div>
      {isOpen && (
        <div className="date-picker-container">
          <div>
            <label>Start Date: </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                onDateChange(date, endDate);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              showMonthYearPicker
              dateFormat="MM-yyyy"
            />
          </div>
          <div>
            <label>End Date: </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                onDateChange(startDate, date);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showMonthYearPicker
              dateFormat="MM-yyyy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeButton;
