function OrangeLabel({ content, size }) {
  return (
    <div
      style={{
        height: `${size+4}px`,
        width: `${size+4}px`,
        padding: "5px",
        display: "flex",
        alignItems: "center",
        fontSize: `${size}px`,
        borderRadius: `${size}px`,
        color: "white",
        backgroundColor: "#8c8397",
      }}
    >
      <div> {content}</div>
    </div>
  );
}
export default OrangeLabel;
