import { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { workType } from "../../Adapter/types";

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

interface propType {
  workHourLog: workType[];
}

const WorkHourTable = (props: propType) => {
  const [currentSort, setCurrentsort] = useState<string>("default");

  const onSortChange = (): void => {
    let nextSort: string;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentsort(nextSort);
  };

  const { workHourLog }: propType = props;

  return (
    workHourLog.length > 0 && (
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
            {[...workHourLog].sort(sortTypes[currentSort].fn).map((p) => (
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
