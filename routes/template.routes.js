
const express = require("express");
const Template = require("../models/template.model.js");
const router = express.Router();
const {getTemplates, getTemplate, createTemplate, updateTemplate, deleteTemplate} = require('../controllers/template.controller.js');

//get template
router.get('/', getTemplates);
router.get("/:id", getTemplate);

router.post("/", createTemplate);

// update a Template
router.put("/:id", updateTemplate);

// delete a Template
router.delete("/:id", deleteTemplate);




module.exports = router;
