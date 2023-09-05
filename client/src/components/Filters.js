import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const dataItems = [
  "start_year",
  "end_year",
  "sector",
  "topic",
  "country",
  "region",
  "pestle",
  "source",
];

const Filters = ({ data, setFilteredData }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const filtered = data.filter((entery) => {
      return (
        (selectedOptions.end_year?.length
          ? selectedOptions.end_year.some(
              (values) => values.value === entery.end_year
            )
          : true) &&
        (selectedOptions.start_year?.length
          ? selectedOptions.start_year.some(
              (values) => values.value === entery.start_year
            )
          : true) &&
        (selectedOptions.topic?.length
          ? selectedOptions.topic.some(
              (values) => values.value === entery.topic
            )
          : true) &&
        (selectedOptions.sector?.length
          ? selectedOptions.sector.some(
              (values) => values.value === entery.sector
            )
          : true) &&
        (selectedOptions.region?.length
          ? selectedOptions.region.some(
              (values) => values.value === entery.region
            )
          : true) &&
        (selectedOptions.pestle?.length
          ? selectedOptions.pestle.some(
              (values) => values.value === entery.pestle
            )
          : true) &&
        (selectedOptions.source?.length
          ? selectedOptions.source.some(
              (values) => values.value === entery.source
            )
          : true) &&
        (selectedOptions.country?.length
          ? selectedOptions.country.some(
              (values) => values.value === entery.country
            )
          : true)
      );
    });

    setFilteredData(filtered);
    // console.log("Filtered Data:", filtered);
    // console.log("Selected Options:", selectedOptions);
  }, [data, selectedOptions]);

  return (
    <>
      {dataItems.map((item) => (
        <div className=" " key={item}>
          <Select
            components={animatedComponents}
            isMulti
            options={
              data
                ? data
                    ?.map((entry) => ({
                      value: entry[item],
                      label: entry[item],
                    }))
                    .filter((option, index, self) => {
                      return (
                        index ===
                        self.findIndex((t) => t.value === option.value)
                      );
                    })
                    .filter(
                      (option) => option.value !== null && option.value !== ""
                    )
                    .sort((a, b) => a.label.localeCompare(b.label))
                : []
            }
            className="select"
            placeholder={`${item}`}
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={true} //
            onChange={(selectedValues) => {
              setSelectedOptions({
                ...selectedOptions,
                [item]: selectedValues,
              });
            }}
          />
        </div>
      ))}
    </>
  );
};

export default Filters;
