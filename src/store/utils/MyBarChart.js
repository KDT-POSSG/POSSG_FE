import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const MyBarChart = ({data, labels}) => {
  console.log("MyBarChart data>>> ",data);
  console.log("MyBarChart labels>>> ",labels);

  const colorPalette = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 0, 0, 0.2)",
    "rgba(0, 255, 0, 0.2)",
    "rgba(0, 0, 255, 0.2)",
    "rgba(255, 255, 0, 0.2)",
    "rgba(0, 255, 255, 0.2)"
  ];

  const defs = colorPalette.map((color, index) => ({
    id: `color${index}`,
    type: "pattern",
    background: "transparent",
    color,
  }));

  const fill = labels.map((label, index) => ({
    match: { id: label },
    id: `color${index}`,
  }));
  return (
      <ResponsiveBar
        data={data}
        keys={["점유율"]}
        indexBy="카드" 
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        defs={defs}
        fill={fill}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '점유율',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
      // <ResponsiveBar
      //   data={data}
      //   keys={[
      //       'hot dog',
      //       'burger',
      //       'sandwich',
      //       'kebab',
      //       'fries',
      //       'donut'
      //   ]}
      //   indexBy="country"
      //   margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      //   padding={0.3}
      //   layout="horizontal"
      //   valueScale={{ type: 'linear' }}
      //   indexScale={{ type: 'band', round: true }}
      //   colors={{ scheme: 'pastel2' }}
      //   defs={[
      //       {
      //           id: 'dots',
      //           type: 'patternDots',
      //           background: 'inherit',
      //           color: '#38bcb2',
      //           size: 4,
      //           padding: 1,
      //           stagger: true
      //       },
      //       {
      //           id: 'lines',
      //           type: 'patternLines',
      //           background: 'inherit',
      //           color: '#eed312',
      //           rotation: -45,
      //           lineWidth: 6,
      //           spacing: 10
      //       }
      //   ]}
      //   fill={[
      //       {
      //           match: {
      //               id: 'fries'
      //           },
      //           id: 'dots'
      //       },
      //       {
      //           match: {
      //               id: 'sandwich'
      //           },
      //           id: 'lines'
      //       }
      //   ]}
      //   borderColor={{
      //       from: 'color',
      //       modifiers: [
      //           [
      //               'darker',
      //               1.6
      //           ]
      //       ]
      //   }}
      //   axisTop={null}
      //   axisRight={null}
      //   axisBottom={{
      //       tickSize: 5,
      //       tickPadding: 5,
      //       tickRotation: 0,
      //       legend: 'country',
      //       legendPosition: 'middle',
      //       legendOffset: 32
      //   }}
      //   axisLeft={{
      //       tickSize: 5,
      //       tickPadding: 5,
      //       tickRotation: 0,
      //       legend: 'food',
      //       legendPosition: 'middle',
      //       legendOffset: -40
      //   }}
      //   labelSkipWidth={12}
      //   labelSkipHeight={12}
      //   labelTextColor={{
      //       from: 'color',
      //       modifiers: [
      //           [
      //               'darker',
      //               1.6
      //           ]
      //       ]
      //   }}
      //   legends={[
      //       {
      //           dataFrom: 'keys',
      //           anchor: 'bottom-right',
      //           direction: 'column',
      //           justify: false,
      //           translateX: 120,
      //           translateY: 0,
      //           itemsSpacing: 2,
      //           itemWidth: 100,
      //           itemHeight: 20,
      //           itemDirection: 'left-to-right',
      //           itemOpacity: 0.85,
      //           symbolSize: 20,
      //           effects: [
      //               {
      //                   on: 'hover',
      //                   style: {
      //                       itemOpacity: 1
      //                   }
      //               }
      //           ]
      //       }
      //   ]}
      />
  );
};

export default MyBarChart;