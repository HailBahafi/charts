import React, { useState, useEffect } from "react";
import axios from "axios";
import Sectors from "./components/Sectors";
import Intensity from "./components/Intensity";
import Likelihood from "./components/Likelihood";
import Relevance from "./components/Relevance";
import Countries from "./components/Countries";
import Topics from "./components/Topics";
import Rele_Inten_Likhood_Dis from "./components/Rele_Inten_Likhood_Dis";
import Source from "./components/Source";
import Filters from "./components/Filters";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios
      .get("https://interactive-data-visualization-dashboard-api-server.vercel.app/user")
      .then((res) => {
        const filteredData = res.data.filter(
          (item) => item.value !== null && item.value !== ""
        );
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  return (
    <div className="container flex bg-slate-300 gap-4 pr-6 w-full h-full">
      <div className="p-4 bg-slate-400 ">
        <h1 className="text-slate-700 font-bold font-serif text-2xl">Select filters:</h1>
        <Filters data={data} setFilteredData={setFilteredData} />
      </div>
      <div className=" flex justify-center flex-wrap  py-10 gap-y-10 gap-x-2">
        
        <div className="responsive_design border-2 w-[28rem] rounded-lg bg-slate-200">
          <Sectors data={filteredData} />
        </div>

        <div className="responsive_design border-2 w-[28rem]  rounded-lg bg-slate-200">
          <Countries data={filteredData} />
        </div>

        <div className="responsive_design border-2 p-2 w-[28rem] rounded-lg bg-slate-200">
          <Source data={filteredData} />
        </div>

        <div className="responsive_design border-2 p-2 w-[28rem] rounded-lg bg-slate-200">
          <Rele_Inten_Likhood_Dis data={filteredData} />
        </div>

        <div className="responsive_design border-2 p-2 w-[28rem] rounded-lg bg-slate-200">
          <Topics data={filteredData} />
        </div>

        <div className="responsive_design border-2 p-2 w-[28rem] rounded-lg bg-slate-200">
          <Relevance data={filteredData} />
        </div>

        <div className="responsive_design border-2 p-2 w-[28rem] rounded-lg bg-slate-200">
          <Intensity data={filteredData} />
        </div>

        <div className="responsive_design border-2 p-2 w-[28rem] rounded-lg bg-slate-200">
          <Likelihood data={filteredData} />
        </div>

      </div>
    </div>
  );
}

export default App;
