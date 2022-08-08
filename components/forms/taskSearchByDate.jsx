import { useState } from "react";
import { DatePicker } from "antd";
import { FormLabel, Typography } from "@mui/material";

import moment from "moment";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const CalendarPicker = ({
  initialDatesValues,
  rangeDatesValues,
  text = "Ingrese un Serial, Email o Compañia",
}) => {
  function onChange(value, dateString) {
    if (value !== undefined) rangeDatesValues(value);
  }

  const defaultValues = () => {
    if (initialDatesValues?.startdate && initialDatesValues?.closuredate) {
      return [
        moment(initialDatesValues?.startdate, dateFormat),
        moment(initialDatesValues?.closuredate, dateFormat),
      ];
    } else {
      return [];
    }
  };

  return (
    <>
      <FormLabel>
        <Typography
          sx={{ mb: 1, color: "#294595" }}
          variant="button"
          display="block"
          gutterBottom
        >
          {text}
        </Typography>
      </FormLabel>
      <RangePicker
        className="MuiAnt-Datepicker"
        onChange={onChange}
        format={dateFormat}
        defaultValue={defaultValues()}
      />
    </>
  );
};

export default CalendarPicker;
