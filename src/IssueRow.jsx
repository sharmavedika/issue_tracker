function IssueRow({ issue, onEdit, onDelete }) {
  return (
    <tr>
      <td>{issue._id}</td>
      <td>{issue.title}</td>
      <td>{issue.owner}</td>
      <td>{issue.status}</td>
      <td>{issue.created}</td>
      <td>{issue.effort}</td>
      <td>{issue.due || "—"}</td>

      <td>
        <button onClick={() => onEdit(issue)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(issue._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default IssueRow;