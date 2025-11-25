import React, { useState, useEffect } from "react";

function IssueEdit({ issue, onUpdate, onClose }) {
  const [form, setForm] = useState(issue);

  useEffect(() => {
    setForm(issue);
  }, [issue]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(form);
  }

  return (
    <div className="modal">
      <h3>Edit Issue</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Owner</label>
        <input
          name="owner"
          value={form.owner}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>New</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>

        <label>Effort (days)</label>
        <input
          name="effort"
          type="number"
          value={form.effort}
          onChange={handleChange}
        />

        <label>Due Date</label>
        <input
          name="due"
          type="date"
          value={form.due}
          onChange={handleChange}
        />

        <div style={{ marginTop: "12px" }}>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default IssueEdit;
