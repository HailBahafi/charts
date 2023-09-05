import React, { useState, useEffect } from "react";
import {PolarArea } from "react-chartjs-2";

function Sources({ data }) {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const sourceData = {};
    data.forEach((item) => {
      if (
        item.relevance !== null &&
        item.relevance !== "" &&
        item.source !== null &&
        item.source !== ""
      ) {
        if (!sourceData[item.source]) {
          sourceData[item.source] = 0;
        }
        sourceData[item.source] += item.relevance;
      }
    });

    const sortedSources = Object.entries(sourceData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedSources.map(([source]) => source);
    const relevanceValues = sortedSources.map(([, relevance]) => relevance);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Relevance",
          data: relevanceValues,
          backgroundColor: [
            "rgba(75, 192, 192, 1)",
            "#ecf0f1",
            "#f0331a",
            "#f3ba2f",
            "#2a71d0",
            "#ff5733",
            "#59a8e4",
            "#ffbf00",
            "#00a86b",
            "#c20078",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const [chartData, setChartData] = useState({
    labels: ["Relevance"],
    datasets: [
      {
        label: "Relevance",
        data: [0],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0",
          "#ff5733",
          "#59a8e4",
          "#ffbf00",
          "#00a86b",
          "#c20078",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="chart-container">
      <PolarArea
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sources Distribution by Relevance",
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

export default Sources;
