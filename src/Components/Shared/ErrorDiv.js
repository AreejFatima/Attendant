/* eslint-disable react/destructuring-assignment */
import { BiErrorCircle } from "react-icons/bi";

const ErrorDiv = (props) => (
    <div className="error">
      <BiErrorCircle size={22} />
      {props.children}
    </div>
  );
 export default ErrorDiv;