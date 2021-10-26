/* eslint-disable react/destructuring-assignment */
import Table from "react-bootstrap/Table";
import RecordsRow from "./RecordsRow";
import { individualRecType } from "../../Adapter/types";

interface propType {
  recordsData: individualRecType[];
}

const RecordsTable = (props: propType) => {
  const { recordsData } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Punch In</th>
          <th>Punch Out</th>
        </tr>
      </thead>
      <tbody>
        {recordsData.map((d) => (
          <RecordsRow date={d.date} punchIn={d.punchIn} punchOut={d.punchOut} />
        ))}
      </tbody>
    </Table>
  );
};

export default RecordsTable;
