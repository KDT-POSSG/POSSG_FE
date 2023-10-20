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
          // [
          //   {
          //     label: "카드사별 매출",
          //     data: data,
          //     backgroundColor: [
          //       "rgba(255, 99, 132, 0.2)",
          //       "rgba(54, 162, 235, 0.2)",
          //       "rgba(255, 206, 86, 0.2)",
          //       "rgba(75, 192, 192, 0.2)",
          //       "rgba(153, 102, 255, 0.2)",
          //       "rgba(255, 159, 64, 0.2)",
          //     ],
          //     borderColor: [
          //       "rgba(255, 99, 132, 1)",
          //       "rgba(54, 162, 235, 1)",
          //       "rgba(255, 206, 86, 1)",
          //       "rgba(75, 192, 192, 1)",
          //       "rgba(153, 102, 255, 1)",
          //       "rgba(255, 159, 64, 1)",
          //     ],
          //     borderWidth: 1,
          //   },
          // ],
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
          // chartOptions,
        // {
        //   scales: {
        //     y: {
        //       beginAtZero: true,
        //       max: 10000000, // 최댓값
        //     },
        //   },
        // },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    destroyChart(); // 기존 차트 파괴
    createChart(); // 새로운 차트 생성

    return () => {
      destroyChart(); // 컴포넌트가 unmount될 때 차트 파괴
    };
  }, [datasets, labels]);

  return <canvas ref={chartRef} width={400} height={400} />;
};

export default MyChart;