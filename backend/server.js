const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;

const Demo = require("./demo.model");
const Info = require("./details.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://127.0.0.1:27017/demodb", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

todoRoutes.route("/").get(function(req, res) {
  Demo.find(function(err, resourcexyz) {
    if (err) {
      console.log(err);
      alert("Resource already exists");
    } else {
      res.json(resourcexyz);
    }
  });
});

todoRoutes.route("/d").get(function(req, res) {
  Info.find(function(err, infos) {
    if (err) {
      console.log(err);
      alert("Resource already exists");
    } else {
      res.json(infos);
    }
  });
});

todoRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Demo.findById(id, function(err, demo) {
    res.json(demo);
  });
});

todoRoutes.route("/add").post(function(req, res) {
  let demo = new Demo(req.body);
  demo
    .save()
    .then(demo => {
      res.status(200).json({ demo: "Resource added successfully" });
    })
    .catch(err => {
      res.status(400).send("Adding new resource failed");
    });
});

todoRoutes.route("/info").post(function(req, res) {
  let info = new Info(req.body);

  info
    .save()
    .then(info => {
      res.status(200).json({ info: "Details added successfully" });
    })
    .catch(err => {
      res.status(400).send("Adding details failed");
    });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if (!demo) res.status(404).send("data is not found");
    else demo.status = req.body.status;

    demo
      .save()
      .then(demo => {
        res.json("demo updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

//const demoRouter = require("./demo");
//const detailsRouter = require("./details");

app.use("/resourcexyz", todoRoutes);
app.use("/infos", todoRoutes);
//app.use("/demo", demoRouter);
//app.use("/details", detailsRouter);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
