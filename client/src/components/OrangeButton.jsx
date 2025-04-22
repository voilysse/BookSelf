import "./OrangeButton.css";
function OrangeButton({ size = 50, text = "butt", func }) {
  return (
    <button
      onClick={func}
      className="orangeButton"
      style={{
        height: `${size + 15}px`,
        padding: "15px",
        display: "flex",
        alignItems: "center",
        fontSize: `${size}px`,
        borderRadius: `${size}px`,
        fontWeight: 600,
        color: "white",
        border: "none",
      }}
    >
      {text}
    </button>
  );
}
export default OrangeButton;
