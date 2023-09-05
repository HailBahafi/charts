import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function PolarChart({ data }) {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const countryData = {};
    data.forEach((item) => {
      if (
        item.intensity !== null &&
        item.intensity !== "" &&
        item.country !== null &&
        item.country !== ""
      ) {
        if (!countryData[item.country]) {
          countryData[item.country] = 0;
        }
        countryData[item.country] += item.intensity;
      }
    });

    const sortedCountries = Object.entries(countryData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedCountries.map(([country]) => country);
    const intensityValues = sortedCountries.map(([, intensity]) => intensity);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Intensity",
          data: intensityValues,
          backgroundColor: [
            "#00bfff",
            "#ff1493",
            "#ffd700",
            "#ff6347",
            "#da70d6",
            "#32cd32",
            "#00ced1",
            "#ff4500",
            "#40e0d0",
            "#dda0dd",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const [chartData, setChartData] = useState({
    labels: ["Intensity"],
    datasets: [
      {
        label: "Intensity",
        data: [0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Intensity Chart</h2> */}
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Country Distribution by Intensity",
            },
          },
          animation: {
            delay: (context) => {
              if (context.type === "data" && context.mode === "default") {
                return context.dataIndex * 100;
              }
            },
            loop: (context) => context.active,
          },
        }}
      />
    </div>
  );
}

export default PolarChart;
