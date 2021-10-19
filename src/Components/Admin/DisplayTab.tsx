/* eslint-disable react/destructuring-assignment */
import { FaUserAlt } from "react-icons/fa";

const R = require("ramda");

const DisplayTab = (props) => (
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
      props.array
    )}
  </div>
);
export default DisplayTab;
