import "../App.css";
const Shimmer = () => {
  return (
    <div className="note-list" data-testid="shimmer">
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div key={index} className="shimmer-card"></div>
        ))}
    </div>
  );
};

export default Shimmer;
