import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const MyChart = ({datasets, labels}) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive:false,
          scales:{
            x:{
              stacked:true,
              display:false,
            },
            y:{
              stacked:true,
              display:false,
            },
          },
          indexAxis:"y",
          plugins:{
            legend:{
              display:false
            }
          }
        }
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    destroyChart(); 
    createChart(); 

    return () => {
      destroyChart(); 
    };
  }, [datasets, labels]);

  return <canvas ref={chartRef} width={1000} height={50} />;
};

export default MyChart;