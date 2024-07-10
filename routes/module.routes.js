
const express = require("express");
const Module = require("../models/module.model.js");
const router = express.Router();
const {getModules, getModule, createModule, updateModule, deleteModule} = require('../controllers/module.controller.js');

//get  module
router.get('/', getModules);
router.get("/:id", getModule);
//create a module
router.post("/", createModule);

// update a module
router.put("/:id", updateModule);

// delete a module
router.delete("/:id", deleteModule);




module.exports = router;
