import { FaUserAlt } from "react-icons/fa";
import * as R from "ramda";

const DisplayTab = (props): JSX.Element => {
  const { availabilityList } = props;
  return (
    <div>
      {R.map(
        (item) => (
          <ul>
            <li>
              <span style={{ display: "flex" }}>
                <FaUserAlt size={40} />
                <h5 style={{ marginLeft: "10%", marginTop: "3%" }}>{item}</h5>
              </span>
            </li>
          </ul>
        ),
        availabilityList
      )}
    </div>
  );
};
export default DisplayTab;
