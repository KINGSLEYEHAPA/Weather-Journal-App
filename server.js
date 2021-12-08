const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
// const cors = require("cors");
// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, function () {
  console.log("Server started on port 5000.");
});
app.use(express.static("website"));
const projectData = { temp: "", date: "", userResponse: "", city: "" };

app.get("/retrievedata", (req, res) => {
  console.log(req.body);
  const serverData = JSON.stringify(projectData);
  res.send(serverData);
  console.log(serverData);
});

app.post("/savedata", (req, res) => {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  projectData.city = req.body.city;
  console.log(projectData);

  res.json("Data received");
});
