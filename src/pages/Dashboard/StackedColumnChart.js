import React from "react"
import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const StackedColumnChart = ({ dataColors, periodData, day }) => {
  const stackedColumnChartColors = getChartColorsArray(dataColors);
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: stackedColumnChartColors,
    xaxis: {
      type: "datetime",
      categories: day,
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={[...periodData]}
        type="area"
        height="359"
        className="apex-charts"
      />
    </React.Fragment>
  );
}

StackedColumnChart.propTypes = {
  periodData: PropTypes.any
}
export default StackedColumnChart;
