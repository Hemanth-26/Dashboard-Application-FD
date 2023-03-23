import React from "react";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";
import moment from "moment";
import "./monthly-graph.scss";

function MonthlyGraph(props) {
  const { dashboardGraph } = props;
  let categorie = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data = [];

  categorie.forEach((element) => {
    data.push(dashboardGraph?.monthlyLogin[element] || 0);
  });

  // console.log("data", data);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#E98074"],
    dataLabels: {
      enabled: false,
    },
    markers: {
      colors: ["#E98074", "#7ce7ac", "#f4be5e"],
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#E98074", "#7ce7ac", "#f4be5e"],
    },
    series: [
      {
        name: "No of Logged In",
        data:
          JSON.stringify(data) !== "[]"
            ? data
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      //   {
      //     name: 'Verfied',
      //     data: [],
      //   },
      //   {
      //     name: 'Completed',
      //     data: [],
      //   },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.6,
        stops: [0, 90, 100],
      },
    },
    grid: {
      show: false,
      yaxis: {
        lines: {
          show: true,
        },
      },
      column: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.3,
      },
    },
    xaxis: {
      categories: categorie,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter: function(value, series) {
          // use series argument to pull original string from chart data
          return `${value} Times`;
        }
      }
    }
  };

  return (
    <Card variant="outlined">
      <div className="graph-con p-3">
        <div className="graph-title">
          <h2 className="">Monthly Login</h2>
          <p>{moment().year()}</p>
        </div>
        <Chart
          options={options}
          series={options.series}
          type="area"
          height="85%"
          width="100%"
          className="px-0 mt-2"
        />
      </div>
    </Card>
  );
}

export default MonthlyGraph;
