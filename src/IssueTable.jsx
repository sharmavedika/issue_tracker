import React from "react";
import IssueRow from "./IssueRow";

function IssueTable({ issues, onEdit, onDelete }) {
  return (
    <div className="card table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {issues.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No issues found
              </td>
            </tr>
          ) : (
            issues.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IssueTable;
