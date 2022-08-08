import React from "react";
import { Chart } from "react-google-charts";

const columns = [
  { type: "string", label: "Serial" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Servicio" },
  { type: "date", label: "Inicio" },
  { type: "date", label: "Finalización" },
  { type: "number", label: "Duración" },
  { type: "number", label: "porcentaje" },
  { type: "string", label: "Dependencies" },
];

export const options = {
  height: 400,
  gantt: {
    trackHeight: 30,
  },
};

const App = ({ rows }) => {
  const data = [columns, ...rows];

  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        const chart = chartWrapper.getChart();
        google.visualization.events.addListener(chart, "onmouseover", (e) => {
          const { row, column } = e;
          console.log(e);
        });
      },
    },
  ];

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
      chartEvents={chartEvents}
    />
  );
};
export default App;
