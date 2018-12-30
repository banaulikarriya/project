const mongoose = require("mongoose");
const Project = require("../model/projectModel");

//function to display project view
async function projectView(req, res) {
  res.render("project");
}

//function to add project
async function createProject(req, res) {
  try {
    let data = req.body;
    let projectData = new Project(data);
    let project = await projectData.save();
    res.redirect("../home");
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.redirect("../project", { err: errMsg });
  }
}

//function to update project
async function updateProject(req, res) {
  let data = req.body;
  try {
    let projectDetails = await Project.findOneAndUpdate({ _id: data.id }, 
      { $set: { project: data.project } }, { new: true }).exec();
    let list = await Project.find({ status: true }).exec();
    res.render("home", { list, projectDetails });
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.redirect("home", { err: errMsg });
  }
}

//function to display all projects
async function allproject(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });

  try {
    let list = await Project.find(query).exec();
    res.render("home", { list: list });
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.render("home", { err: errMsg });
  }
}

//function to fetch details of one project
async function projectDetails(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });

  try {
    let list = await Project.find(query).exec();
    if (req.params.id) {
      query.$and.push({ _id: req.params.id });
    }
    let projectDetails = await Project.findOne(query).exec();
    res.render("home", { list, projectDetails });
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.render("home", { err: errMsg });
  }
}

//function to fetch details of one project for update
async function projectOne(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });

  try {
    if (req.params.id) {
      query.$and.push({ _id: req.params.id });
    }
    let projectDetails = await Project.findOne(query).exec();
    res.render("projectUpdate", { projectDetails });
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.render("projectUpdate", { err: errMsg });
  }
}

//function to add froms in projects
async function createForm(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });

  try {
    let data = req.body;
    let projectDetails = await Project.findOneAndUpdate(
      { _id: data.project },
      { $push: { forms: data }, $inc: { formsubmitted: 1 } },
      { new: true }
    ).exec();
    let list = await Project.find(query).exec();
    if (projectDetails) {
      res.render("home", { list, projectDetails });
    }
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.redirect("../home", { err: errMsg });
  }
}

//function remove the form
async function removeForm(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });
  try {
    if (req.params.formId) {
      query.$and.push({ "forms._id": { $in: [req.params.formId] } });
    }
    let projectDetails = await Project.findOneAndUpdate(
      query,
      {
        $pull: { forms: { _id: req.params.formId } },
        $inc: { formsubmitted: -1 }
      },
      { new: true }
    ).exec();
    let list = await Project.find({ status: true }).exec();
    res.render("home", { list, projectDetails });
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.render("home", { err: errMsg });
  }
}

//function to add user in projects
async function createUser(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });

  try {
    let data = req.body;
    let projectDetails = await Project.findOneAndUpdate(
      { _id: data.project },
      { $push: { profile: data }, $inc: { totalUser: 1 } },
      { new: true }
    ).exec();
    let list = await Project.find(query).exec();
    if (projectDetails) {
      res.render("home", { list, projectDetails, userFlag: true });
    }
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.redirect("../home", { err: errMsg });
  }
}

//function remove the user
async function removeUser(req, res) {
  let query = { $and: [] };
  query.$and.push({ status: true });
  try {
    if (req.params.userId) {
      query.$and.push({ "profile._id": { $in: [req.params.userId] } });
    }
    let projectDetails = await Project.findOneAndUpdate(
      query,
      {
        $pull: { profile: { _id: req.params.userId } },
        $inc: { totalUser: -1 }
      },
      { new: true }
    ).exec();
    let list = await Project.find({ status: true }).exec();
    res.render("home", { list, projectDetails, userFlag: true });
  } catch (err) {
    var errMsg = "There was Error " + err + "\n";
    res.render("home", { err: errMsg });
  }
}
module.exports = {
  projectView,
  createProject,
  allproject,
  createForm,
  projectDetails,
  removeForm,
  createUser,
  removeUser,
  updateProject,
  projectOne
};
