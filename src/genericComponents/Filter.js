import React, { memo } from "react";
import "../styles/Filter.css";

const Filter = ({ filters, selectedFilters, onFilterChange }) => {
  return (
    <div className="filterContainer">
      Filter by:
      {filters.map((filter, index) => {
        const [key, options] = Object.entries(filter)[0];
        return (
          <div key={index} className="filterSelect">
            <select
            className="filterSelect"
              value={selectedFilters[key]}
              onChange={(e) =>
                onFilterChange(key, e.target.value)
              }
            >
              <option value="" disabled>
                {key}
              </option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Filter);
