const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");

router.route("/projects").post(projectController.getProject);
router.route("/projects/:projectId").put(projectController.updateProject);
router.route("/projects/:projectId").patch(projectController.updateProject);
router.route("/projects/create").post(projectController.createProject);


module.exports = router