import { Line } from "react-chartjs-2";
import { chartType } from "../../Adapter/types";

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

interface propType {
  data: () => chartType;
}

const LineChart = (props: propType): JSX.Element => {
  const { data } = props;
  return (
    <>
      <div
        className="hourly_graph"
        style={{
          marginLeft: "9%",
          width: 700,
          height: 300,
          marginBottom: "2%",
        }}
      >
        {data ? <Line data={data} options={options} /> : null}
      </div>
    </>
  );
};

export default LineChart;
