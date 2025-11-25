import React, { useState } from "react";

function IssueAdd({ addIssue }) {
  const [form, setForm] = useState({
    title: "",
    owner: "",
    status: "New",
    effort: "",
    due: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addIssue(form);

    // Clear form
    setForm({
      title: "",
      owner: "",
      status: "New",
      effort: "",
      due: "",
    });
  }

  return (
    <div className="card">
      <h3>Add New Issue</h3>

      <form onSubmit={handleSubmit} className="form-grid">

        {/* Title - Full Width */}
        <div className="form-grid-full">
          <label>Title</label>
          <input
            name="title"
            placeholder="Enter issue title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Owner */}
        <div>
          <label>Owner</label>
          <input
            name="owner"
            placeholder="Assigned to"
            value={form.owner}
            onChange={handleChange}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>New</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Effort */}
        <div>
          <label>Effort (days)</label>
          <input
            name="effort"
            type="number"
            placeholder="Effort required"
            value={form.effort}
            onChange={handleChange}
          />
        </div>

        {/* Due Date */}
        <div>
          <label>Due Date</label>
          <input
            name="due"
            type="date"
            value={form.due}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button - Full Width */}
        <div className="form-grid-full">
          <button type="submit" style={{ marginTop: "8px" }}>
            Add Issue
          </button>
        </div>

      </form>
    </div>
  );
}

export default IssueAdd;
