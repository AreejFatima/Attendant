import { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const sortTypes = {
  up: {
    class: "sort-up",
    fn: (a, b) => a.totalHours - b.totalHours,
  },
  down: {
    class: "sort-down",
    fn: (a, b) => b.totalHours - a.totalHours,
  },
  default: {
    class: "sort",
    fn: (a) => a,
  },
};

const WorkHourTable = (props) => {
  const [currentSort, setCurrentsort] = useState("default");

  const onSortChange = () => {
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentsort(nextSort);
  };

  const { data } = props;

  return (
    data.length > 0 && (
      <div className="wh">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>
                Total Hours
                <button onClick={onSortChange}>
                  {sortTypes[currentSort].class === "sort-up" ||
                  sortTypes[currentSort].class === "sort" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )}
                </button>
              </th>
              <th>Average Hours</th>
            </tr>
          </thead>
          <tbody>
            {[...data].sort(sortTypes[currentSort].fn).map((p) => (
              <tr>
                <td>{p.id}</td>
                <td>{p.totalHours}hrs</td>
                <td>{p.averageHours}hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default WorkHourTable;
