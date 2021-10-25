import { Line } from "react-chartjs-2";


const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = ({ data }) => (
  <>
    <div
      className="hourly_graph"
      style={{ marginLeft:'9%', width: 700, height: 300, marginBottom:'2%'}}
    >
      {data ? <Line data={data} options={options} /> : null}
    </div>
  </>
);

export default LineChart;
