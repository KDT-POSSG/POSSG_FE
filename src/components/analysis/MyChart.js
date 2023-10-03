import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const MyChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
// labels : 해당되는 영역은 라인 그래프가 생성되었을 때 하단에 보이는 데이터명입니다. 이부분을 수정해서 각 지점에 맞는 데이터명을 입력하시면 됩니다.
// datasets>data : 이부분은 해당 데이터의 수치를 입력하는 부분임으로 차트 데이터를 넣는다고 보시면 됩니다. labels와 data 갯수를 맞춰서 진행하시길 바랍니다. 
// options>scales>y>max : 최댓값을 지정해서 차트를 완성시키면 됩니다.
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["매출", "지출", "순이익"],
          datasets: [
            {
              label: "# of Votes",
              data: [15, 20, 60, 10, 22, 30],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
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
  }, []);

  return <canvas ref={chartRef} />;
};

export default MyChart;