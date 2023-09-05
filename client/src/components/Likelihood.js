import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function Likelihood({ data }) {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const countryData = {};
    data.forEach((item) => {
      if (
        item.likelihood !== null &&
        item.likelihood !== null &&
        item.country !== null &&
        item.country !== ""
      ) {
        if (!countryData[item.country]) {
          countryData[item.country] = 0;
        }
        countryData[item.country] += item.likelihood;
      }
    });

    const sortedCountries = Object.entries(countryData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedCountries.map(([country]) => country);
    const likelihoodValues = sortedCountries.map(
      ([, likelihood]) => likelihood
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Likelihood",
          data: likelihoodValues,
          backgroundColor: [
            "#228b22",
            "#ecf0f1",
            "#f0331a",
            "#f3ba2f",
            "#2a71d0",
            "#ff69b4",
            "#bdb76b",
            "#d2b48c",
            "#800080",
            "#1e90ff",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const [chartData, setChartData] = useState({
    labels: ["Likelihood"],
    datasets: [
      {
        label: "Likelihood",
        data: [0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0",
          "#ff69b4",
          "#bdb76b",
          "#d2b48c",
          "#800080",
          "#1e90ff",
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
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Country Distribution by Likelihood",
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

export default Likelihood;
