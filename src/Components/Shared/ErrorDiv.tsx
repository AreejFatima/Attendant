import { FC } from "react";
import { BiErrorCircle } from "react-icons/bi";

const ErrorDiv: FC = (props: any) => {
  const { children } = props;
  return (
    <div className="error">
      <BiErrorCircle
        size={19}
        style={{ marginBottom: "2.2px", padding: "1px" }}
      />
      {children}
    </div>
  );
};
export default ErrorDiv;
