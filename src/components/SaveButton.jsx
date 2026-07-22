
function SaveButton() {
  return (
    <div style={{ marginTop: "20px" }}>
      <button
        type="submit"
        style={{
          background: "green",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        💾 Save Work
      </button>
    </div>
  );
}

export default SaveButton;