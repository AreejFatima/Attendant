/* eslint-disable react/destructuring-assignment */
import Table from "react-bootstrap/Table";
import RecordsRow from "./RecordsRow";

const RecordsTable = (props) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Date</th>
        <th>Punch In</th>
        <th>Punch Out</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((d) => (
        <RecordsRow date={d.date} punchIn={d.punchIn} punchOut={d.punchOut} />
      ))}
    </tbody>
  </Table>
);

export default RecordsTable;
