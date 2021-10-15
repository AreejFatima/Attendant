export interface rowType {
  date: string;
  punchIn: string;
  punchOut: string;
}

const RecordsRow = (props: rowType) => {
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
