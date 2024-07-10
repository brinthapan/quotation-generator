
const express = require("express");
const Component = require("../models/components.model.js");
const router = express.Router();
const {getComponents, getComponent, createComponent, updateComponent, deleteComponent} = require('../controllers/components.controller.js');

//get  component
router.get('/', getComponents);
router.get("/:id", getComponent);
//create a component
router.post("/", createComponent);

// update a component
router.put("/:id", updateComponent);

// delete a component
router.delete("/:id", deleteComponent);




module.exports = router;
