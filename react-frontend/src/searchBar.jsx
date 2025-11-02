const SearchBar = ({ selectedTag, setSelectedTag }) => {
  const options = [
    { value: "all", label: "All Videos" },
    { value: "bodyweight", label: "Body Weight" },
    { value: "stretch", label: "Stretch" },
    { value: "weights", label: "Weights" },
  ];

  return (
    <div style={{ marginBottom: "20px" }}>
      <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
