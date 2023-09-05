import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";

function Years({ data }) {
  const [chartData, setChartData] = useState({
    labels: [], 
    datasets: [
      {
        label: "Relevance",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Intensity",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "likelihood",
        data: [],
        backgroundColor: "rgba(255, 128, 0, 0.2)",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    const pestleData = {};
    data.forEach((item) => {
      if (
        item.relevance !== null &&
        item.relevance !== "" &&
        item.intensity !== null &&
        item.intensity !== "" &&
        item.likelihood !== null &&
        item.likelihood !== "" &&
        item.pestle !== null &&
        item.pestle !== ""
      ) {
        const key = item.pestle;
        if (!pestleData[key]) {
          pestleData[key] = { relevance: 0, intensity: 0, likelihood: 0 };
        }
        pestleData[key].relevance += item.relevance;
        pestleData[key].intensity += item.intensity;
        pestleData[key].likelihood += item.likelihood;
      }
    });

    const sortedPestles = Object.entries(pestleData)
      .sort(
        (a, b) =>
          b[1].relevance +
          b[1].intensity +
          b[1].likelihood -
          (a[1].relevance + a[1].intensity + a[1].likelihood)
      )
      .slice(0, 10);

    const labels = sortedPestles.map(([pestle]) => pestle);
    const relevanceValues = sortedPestles.map(([, values]) => values.relevance);
    const intensityValues = sortedPestles.map(([, values]) => values.intensity);
    const likelihoodValues = sortedPestles.map(
      ([, values]) => values.likelihood
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Relevance",
          data: relevanceValues,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Intensity",
          data: intensityValues,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Likelihood",
          data: likelihoodValues,
          backgroundColor: "rgba(255, 128, 0, 0.2)",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  return (
    <div className="chart-container">
      <Radar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Pestle Distribution by Relevance, Intensity and Likelihood",
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

export default Years;
