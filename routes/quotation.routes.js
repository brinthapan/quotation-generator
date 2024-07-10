const express = require('express');
const router = express.Router();
const { generateQuotation } = require('../controllers/quotation.controller.js');

// Endpoint to generate a quotation for a given project
router.post('/:projectId', generateQuotation);

module.exports = router;
