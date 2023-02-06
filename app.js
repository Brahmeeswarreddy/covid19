const express = require("express");

const sqlite = require("sqlite");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "covid19India.db");
let db = null;
const initializeDbandserver = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at 3000");
    });
  } catch (e) {
    console.log(`DB:Error ${e.message}`);
    process.exit(1);
  }
};
initializeDbandserver();

app.get("/states/", async (request, response) => {
  const allStates = `
    SELECT * FROM state 
    ORDER BY state_id`;
  const allStatesArray = await db.all(allStates);
  response.send(allStatesArray);
});

app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const allstatesId = `
    SELECT state FROM state
    WHERE state_id=${stateId} `;
  const stateSelect = await db.get(allstatesId);
  response.send(stateSelect);
});
