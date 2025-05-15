function CoverCard({ source, width, height }) {
  return (
    <img
      src={source}
      alt="Cover of a book"
      style={{
        width: `${width}`,
        height: `${height}`,
        borderRadius: "10px",
        boxShadow: `0px 0px 8px rgba(0,0,0,0.5)`,
      }}
    />
  );
}
export default CoverCard;
