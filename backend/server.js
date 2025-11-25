import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());


connect("mongodb://127.0.0.1:27017/issuetracker") 
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const IssueSchema = new Schema({
  title: String,
  owner: String,
  status: String,
  created: String,
  effort: Number,
  due: String,
});

const Issue = model("Issue", IssueSchema);

// Routes
app.get("/api/issues", async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
});

app.post("/api/issues", async (req, res) => {
  const newIssue = new Issue(req.body);
  await newIssue.save();
  res.json(newIssue);
});

app.put("/api/issues/:id", async (req, res) => {
  const updatedIssue = await Issue.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedIssue);
});

app.delete("/api/issues/:id", async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.json({ message: "Issue deleted" });
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));