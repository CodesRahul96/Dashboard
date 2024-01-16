const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  projectName: { type: String, require: true },
  department: { type: String, require: true },
  reason: { type: String, require: true },
  category: { type: String, require: true },
  priority: { type: String, require: true },
  type: { type: String, require: true },
  division: { type: String, require: true },
  location: { type: String, require: true },
  projectName: { type: String, require: true },
  startDate: { type: String, require: true },
  endDate: { type: String, require: true },
  status: { type: String},
});

const Project = new model("Project", projectSchema);

module.exports = Project;
