import cors from "cors";
import https from "https";
import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import { json } from "body-parser";
import moment from "moment-timezone";

dotenv.config({ path: ".env.test" });

import routes from "./routes";
import routeTest from "./routes/routeTest";
import ErrorHandler from "./middlewares/ErrorHandler";
import setupMetrics from "./middlewares/MetricsHandler";
import LimiterHandler from "./middlewares/LimiterHandler";
import ResponseHandler from "./middlewares/ResponseHandler";

import dbConn from "./middlewares/dbcons/dbConn";

const PORT = process.env.PORT || 8000;
moment.tz(process.env.MOMENT_TIMEZONE || "Asia/Jakarta");

const app = express();

// set up metric, for api monitoring using prometheus
setupMetrics(app);

// set up limiter for every user in 1 minutes
app.use(LimiterHandler);

// set up others middleware handle
app.use(json()); // body-parser
app.use(
  express.urlencoded({
    extended: false
  })
);
// handling custom response
app.use(ResponseHandler);

// handling cors
app.use(cors());

// set up route
app.use(routes);
app.use('/tests', routeTest);

// set up error handler
app.use(ErrorHandler);

export const server = app.listen(PORT)

export async function connectDatabases() {
  try {
    await dbConn.authenticate();
    console.log("-------- DB connected --------");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function closeDatabase() {
  await dbConn.close();
}