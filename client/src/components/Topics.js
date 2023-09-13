import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Topic({ data }) {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const topicData = {};
    data.forEach((item) => {
      if (item.topic !== null && item.topic !== "") {
        if (!topicData[item.topic]) {
          topicData[item.topic] = 0;
        }
        topicData[item.topic] += item.intensity;
      }
    });

    const sortedTopics = Object.entries(topicData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedTopics.map(([topic]) => topic);
    const intensityValues = sortedTopics.map(([, intensity]) => intensity);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Intensity",
          data: intensityValues,
          backgroundColor: [
            "rgba(75,192,192,1)",
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
    labels: ["Topics"],
    data: [1, 2, 3],
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
      {/* <h2 style={{ textAlign: "center" }}>Intensity Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Top 10 Topics by Intensity",
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

export default Topic;
