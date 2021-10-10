const SearchBar = (props) => (
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
      onChange={(e) => props.update(e)}
    />
  </div>
);

export default SearchBar;
