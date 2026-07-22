function FarmerDetails({ form, handleChange }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        marginBottom: "25px"
      }}
    >
      <h2
        style={{
          color: "#166534",
          marginBottom: "25px",
          borderLeft: "6px solid #22c55e",
          paddingLeft: "12px"
        }}
      >
        👨‍🌾 Farmer Details
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}
      >
        {/* Date */}

        <div>
          <label>📅 Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* Farmer Name */}

        <div>
          <label>👤 Farmer Name</label>

          <input
            type="text"
            name="farmerName"
            placeholder="Enter Farmer Name"
            value={form.farmerName}
            onChange={handleChange}
          />
        </div>

        {/* Village */}

        <div>
          <label>🏡 Village</label>

          <input
            type="text"
            name="village"
            placeholder="Village Name"
            value={form.village}
            onChange={handleChange}
          />
        </div>

        {/* Mobile */}

        <div>
          <label>📱 Mobile Number</label>

          <input
            type="text"
            name="mobile"
            placeholder="9876543210"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default FarmerDetails;