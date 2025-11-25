import React, { useState, useEffect } from "react";
import IssueFilter from "./IssueFilter";
import IssueTable from "./IssueTable";
import IssueAdd from "./IssueAdd";
import IssueEdit from "./IssueEdit";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingIssue, setEditingIssue] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/issues");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        if (mounted) setIssues(data);
      } catch (err) {
        console.error("Error loading issues:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function addIssue(newIssue) {
    const created = new Date().toISOString().split("T")[0];
    try {
      const res = await fetch("http://localhost:5000/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newIssue, created }),
      });
      if (!res.ok) throw new Error(`Failed to add issue: ${res.status}`);
      const issue = await res.json();
      // use functional update to avoid stale closure
      setIssues((prev) => [...prev, issue]);
      setFilterStatus("All");
    } catch (err) {
      console.error("Error adding issue:", err);
    }
  }

  async function updateIssue(updated) {
    try {
      const res = await fetch(
        `http://localhost:5000/api/issues/${updated._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      const newIssue = await res.json();
      setIssues((prev) =>
        prev.map((i) => (i._id === newIssue._id ? newIssue : i))
      );
      setEditingIssue(null);
    } catch (err) {
      console.error("Error updating issue:", err);
    }
  }

  async function deleteIssue(id) {
    // optional confirm
    if (!window.confirm("Delete this issue?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
      setIssues((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Error deleting issue:", err);
    }
  }

  const filteredIssues =
    filterStatus === "All"
      ? issues
      : issues.filter((i) => i.status === filterStatus);

  return (
    <div className="container">
      <IssueFilter setFilterStatus={setFilterStatus} />

      <IssueTable
        issues={filteredIssues}
        onEdit={setEditingIssue}
        onDelete={deleteIssue}
      />

      <IssueAdd addIssue={addIssue} />

      {editingIssue && (
        <IssueEdit
          issue={editingIssue}
          onUpdate={updateIssue}
          onClose={() => setEditingIssue(null)}
        />
      )}
    </div>
  );
}

export default IssueList;
