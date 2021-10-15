// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";

const SearchBar = (props: any) => (
  <div>
    <input
      className="form-control mb-2"
      style={{
        width: "30%",
        marginLeft: "35%",
        border: "2px solid black",
        marginTop: "1%",
      }}
      placeholder="Search Record..."
      onChange={(event) => props.update(event)}
    />
  </div>
);

export default SearchBar;
