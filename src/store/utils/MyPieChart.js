import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

const MyPieChart = ({ data, labels, chartOptions }) => {
    const chartRef = useRef(null);
    let chartInstance = null;

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        const createChart = () => {
        Chart.register(...registerables);
        chartInstance = new Chart(ctx, {
            type: "pie",
            data: {
            labels: labels,
            datasets: [
                {
                label: "",
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(75, 192, 192, 0.2)", 
                    "rgba(255, 159, 64, 0.2)",
                ],
                },
            ],
            },
            options: chartOptions,
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
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default MyPieChart;