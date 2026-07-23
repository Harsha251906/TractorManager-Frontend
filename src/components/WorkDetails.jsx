import "../styles/Work.css";

function WorkDetails({ form, handleChange }) {

  return (
    <div className="work-card">

      <h2 className="work-title">
        🚜 Work Details
      </h2>

      <div className="work-grid">

        {/* Work Type */}

        <div className="form-group">

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

        {/* Calculation Type */}

        <div className="form-group">

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

        <div className="form-group">

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

               {/* Tractor Number */}

        <div className="form-group">
          <label>🔢 Tractor Number</label>

          <input
            className="form-input"
            type="text"
            name="tractorNumber"
            placeholder="TN-01-AB-1234"
            value={form.tractorNumber}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Hour Calculation */}

      {form.calculationType === "hour" && (

        <div className="calculation-box">

          <h3>⏰ Hour Based Calculation</h3>

          <div className="form-grid">

            <div className="form-group">
              <label>Start Time</label>

              <input
                className="form-input"
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Time</label>

              <input
                className="form-input"
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Rate Per Hour (₹)</label>

              <input
                className="form-input"
                type="number"
                name="ratePerHour"
                value={form.ratePerHour}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Total Hours</label>

              <input
                className="form-input"
                type="number"
                value={form.hours}
                readOnly
              />
            </div>

          </div>

        </div>

      )}

      {/* Acre Calculation */}

      {form.calculationType === "acre" && (

        <div className="calculation-box">

          <h3>🌾 Acre Based Calculation</h3>

          <div className="form-grid">

            <div className="form-group">
              <label>Total Acres</label>

              <input
                className="form-input"
                type="number"
                name="acres"
                value={form.acres}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Rate Per Acre (₹)</label>

              <input
                className="form-input"
                type="number"
                name="ratePerAcre"
                value={form.ratePerAcre}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

      )}

      {/* Total Amount */}

      <div className="total-box">

        <h2>💰 Total Amount</h2>

        <h1>₹{Number(form.totalAmount).toLocaleString()}</h1>

      </div>

    </div>

  );

}

export default WorkDetails;