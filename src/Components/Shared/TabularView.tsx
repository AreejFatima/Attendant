import { hourlyType } from "../../Adapter/types";

interface propType {
  tableData: hourlyType[];
  total: number;
}

const TabularView = (props: propType) => {
  const { tableData, total } = props;
  function checkBoundaries(user: hourlyType) {
    const calculated: number = user.WorkHours;
    if (calculated > total) {
      return "rgba(11, 242, 33, 0.4)";
    }
    if (calculated < total) {
      return "rgba(255, 0, 19, 0.36)";
    }
    return "#f3f3f3";
  }

  return (
    <table className="styled-table" style={{ width: "80%", marginLeft: "9%" }}>
      <thead>
        <tr style={{ backgroundColor: "rgb(77, 75, 75)" }}>
          <th>Time Span</th>
          <th>Total Hours</th>
          <th>Employee Hours</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((u) => (
          <tr style={{ backgroundColor: checkBoundaries(u) }}>
            <td>{u.date}</td>
            <td>{total}</td>
            <td>{u.WorkHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TabularView;
