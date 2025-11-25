import React from "react";

function IssueFilter({ setFilterStatus }) {
  return (
    <div className="card">
      <h3>Filter Issues</h3>

      <label>Status</label>
      <select onChange={(e) => setFilterStatus(e.target.value)}>
        <option>All</option>
        <option>New</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>
    </div>
  );
}

export default IssueFilter;
