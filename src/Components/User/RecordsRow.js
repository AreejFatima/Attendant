const RecordsRow = (props) => {
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
