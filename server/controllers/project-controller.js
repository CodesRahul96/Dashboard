const Project = require("../models/project-model");

const createProject = async (req, res) => {
  try {
    const response = req.body;
    await Project.create(response);
    return res.status(200).json({ message: "Project Created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Message not delivered" });
  }
};

const getProject = async (req, res) => {
  try {
    const response = await Project.find();
    if (!response) {
      res.status(404).json({ msg: "No service found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`Project: ${error}`);
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { status },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatedProject = async (e) => {
  e.preventDefault();
  try {
    const URL = `http://localhost:5000/api/projects/${params.id}`;
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success("Updated Successfully");
      navigate("/admin/users")
    } else {
      toast.error("Not Updated");
    }
  } catch (error) {
    console.log(error);
  }
};



module.exports = {getProject,createProject,updateProject,updatedProject};
