/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const ErrorDiv: React.FC = (props: any) => (
  <div className="error">
    <BiErrorCircle size={19} style={{marginBottom:'2.2px',padding:'1px'}}/>
    {props.children}
  </div>
);
export default ErrorDiv;
