import { individualRecType } from "../../Adapter/types";

const RecordsRow = (props: individualRecType) => {
  const { date, punchIn, punchOut } = props;
  return (
    <tr>
      <td>{date}</td>
      <td>{punchIn}</td>
      <td>{punchOut}</td>
    </tr>
  );
};

export default RecordsRow;
