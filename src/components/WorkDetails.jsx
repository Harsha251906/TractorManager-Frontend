function WorkDetails({ form, handleChange }) {
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
          borderLeft: "6px solid #22c55e",
          paddingLeft: "12px",
          marginBottom: "25px"
        }}
      >
        🚜 Work Details
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}
      >
        {/* Work Type */}

        <div>
          <label>🚜 Work Type</label>

          <select
            name="workType"
            value={form.workType}
            onChange={handleChange}
          >
            <option value="">Select Work</option>
            <option value="Ploughing">🌾 Ploughing</option>
            <option value="Rotavator">🚜 Rotavator</option>
            <option value="Cultivator">🌱 Cultivator</option>
            <option value="Trailer">🚛 Trailer</option>
            <option value="Seed Sowing">🌱 Seed Sowing</option>
            <option value="Harvest">🌾 Harvest</option>
            <option value="Other">📦 Other</option>
          </select>
        </div>

        {/* Calculation */}

        <div>
          <label>📐 Calculation Type</label>

          <select
            name="calculationType"
            value={form.calculationType}
            onChange={handleChange}
          >
            <option value="hour">⏰ Hour</option>
            <option value="acre">🌾 Acre</option>
          </select>
        </div>

        {/* Tractor */}

        <div>
          <label>🚜 Select Tractor</label>

          <select
            name="tractorName"
            value={form.tractorName}
            onChange={handleChange}
          >
            <option value="Tractor 1">🚜 Tractor 1</option>
            <option value="Tractor 2">🚜 Tractor 2</option>
            <option value="Tractor 3">🚜 Tractor 3</option>
            <option value="Tractor 4">🚜 Tractor 4</option>
          </select>
        </div>

        {/* Tractor Number */}

        <div>
          <label>🔢 Tractor Number</label>

          <input
            type="text"
            name="tractorNumber"
            placeholder="TN-01-AB-1234"
            value={form.tractorNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <br />
            {form.calculationType === "hour" && (
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            background: "#f8fafc",
            borderRadius: "15px",
            border: "1px solid #dbeafe"
          }}
        >
          <h3 style={{ color: "#166534" }}>
            ⏰ Hour Based Calculation
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px"
            }}
          >
            <div>
              <label>Start Time</label>

              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Time</label>

              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Rate Per Hour (₹)</label>

              <input
                type="number"
                name="ratePerHour"
                value={form.ratePerHour}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Total Hours</label>

              <input
                type="number"
                value={form.hours}
                readOnly
              />
            </div>
          </div>
        </div>
      )}

      {form.calculationType === "acre" && (
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            background: "#f8fafc",
            borderRadius: "15px",
            border: "1px solid #dbeafe"
          }}
        >
          <h3 style={{ color: "#166534" }}>
            🌾 Acre Based Calculation
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px"
            }}
          >
            <div>
              <label>Total Acres</label>

              <input
                type="number"
                name="acres"
                value={form.acres}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Rate Per Acre (₹)</label>

              <input
                type="number"
                name="ratePerAcre"
                value={form.ratePerAcre}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "30px",
          background: "linear-gradient(135deg,#16a34a,#22c55e)",
          color: "#fff",
          borderRadius: "18px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(22,163,74,.30)"
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            border: "none",
            padding: 0
          }}
        >
          💰 Total Amount
        </h2>

        <h1
          style={{
            marginTop: "15px",
            fontSize: "42px"
          }}
        >
          ₹{Number(form.totalAmount).toLocaleString()}
        </h1>
      </div>

    </div>
  );
}

export default WorkDetails;