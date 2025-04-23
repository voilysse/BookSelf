function OrangeLabel({ content, size }) {
  return (
    <div
      style={{
        height: `${size}px`,
        padding: "5px",
        display: "flex",
        alignItems: "center",
        fontSize: `${size}px`,
        borderRadius: `${size}px`,
        color: "white",
        backgroundColor: "rgb(229, 79, 34)",
      }}
    >
      <div> {content}</div>
    </div>
  );
}
export default OrangeLabel;
