
function PaymentDetails({ form, handleChange }) {
  return (
    <div>

      <h2>💳 Payment Details</h2>

      <label>Diesel Used (Litres)</label>

      <br />

      <input
        type="number"
        name="dieselUsed"
        value={form.dieselUsed}
        onChange={handleChange}
      />

      <br /><br />

      <label>Driver Name</label>

      <br />

      <input
        type="text"
        name="driverName"
        value={form.driverName}
        onChange={handleChange}
      />

      <br /><br />

      <label>Payment Status</label>

      <br />

      <select
        name="paymentStatus"
        value={form.paymentStatus}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      </select>

    </div>
  );
}

export default PaymentDetails;