const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes.js');
const { authenticateToken } = require('./auth.middleware.js');
const Project = require("./models/project.model.js");
const projectRoute = require("./routes/project.routes.js");
const template = require("./models/template.model.js");
const templateRoute = require("./routes/template.routes.js");
const component = require("./models/components.model.js");
const componentRoute = require("./routes/components.routes.js");
const quotationRoute = require("./routes/quotation.routes.js");
const Module = require("./models/module.model.js");
const moduleRoute = require("./routes/module.routes.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use("/api/projects", projectRoute);
app.use("/api/template", templateRoute);
app.use("/api/component", componentRoute);
app.use("/api/quotation", quotationRoute);
app.use('/api/users', userRoutes);
app.use('/api/module', moduleRoute);

app.get('/api/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});



app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Error handling middleware (should be placed after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongoose
  .connect(
    "mongodb+srv://brinthapanj:wAFyvbqRJqhScOBU@brintha.mnqdcc5.mongodb.net/?retryWrites=true&w=majority&appName=brintha"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });