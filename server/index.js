const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
const DbService = require("./src/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const db = DbService.getDbServiceInstance();
  const result = db.getData();
  const tableResult = db.getTableData();

  Promise.all([result, tableResult])
    .then(([data, tableData]) => {
      res.json({ data: data, tableData: tableData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.post("/", (req, res) => {
  const { Name } = req.body;
  const { dateString } = req.body;
  const { Trip } = req.body;
  const { MarkerType } = req.body;
  const { Distance } = req.body;
  const { TotalFare } = req.body;


  const db = DbService.getDbServiceInstance();
  const result = db.postData(Name, dateString, Trip, MarkerType, Distance, TotalFare);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err.message));
});
app.listen(PORT, () => {
  console.log("app listning on " + PORT);
});
