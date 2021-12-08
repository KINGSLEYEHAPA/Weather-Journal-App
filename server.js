const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");
// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
app.use(express.static("website"));
const projectData = [
  {
    temperature: 25,
    date: "05 December 2021",
    userResponse: "London",
    temp: "file",
  },
];

app.get("/", (req, res) => {
  res.send(projectData);
});

app.post("/", (req, res) => {
  console.log(req.body);
  projectData.push(req.body);
  console.log(projectData);

  res.json("response:Data received");
});
