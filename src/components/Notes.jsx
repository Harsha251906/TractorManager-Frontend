
function Notes({ form, handleChange }) {
  return (
    <div>

      <h2>📝 Notes</h2>

      <textarea
        name="notes"
        rows="5"
        cols="50"
        placeholder="Enter Notes"
        value={form.notes}
        onChange={handleChange}
      />

    </div>
  );
}

export default Notes;