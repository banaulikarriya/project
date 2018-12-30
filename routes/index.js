var express = require("express");
var router = express.Router();

//import all controller
var userController = require("../controller/userController");
var projectController = require("../controller/projectController");

/* route for login and register */
router.get("/", userController.getlogin);
router.get("/register", userController.getRegister);
router.post("/register", userController.addUser);
router.post("/login", userController.login);

/* route for project */
router.get("/project", projectController.projectView);
router.get("/home", projectController.allproject);
router.get("/project/:id", projectController.projectDetails);
router.post("/createProject", projectController.createProject);
router.get("/projectOne/:id", projectController.projectOne);
router.post("/updateProject", projectController.updateProject);

/* project forms */
router.post("/createForm", projectController.createForm);
router.get("/form/:formId", projectController.removeForm);

/* project user */
router.post("/createUser", projectController.createUser);
router.get("/user/:userId", projectController.removeUser);

module.exports = router;
