import cors from "cors";
import https from "https";
import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import { json } from "body-parser";
import moment from "moment-timezone";

const NODE_ENV = process.env.NODE_ENV || "development";
const ENV_FILE = NODE_ENV !== "production" ? ".env.development" : ".env";
dotenv.config({
  path: ENV_FILE,
});

import routes from "./routes";
import ErrorHandler from "./middlewares/ErrorHandler";
import setupMetrics from "./middlewares/MetricsHandler";
import LimiterHandler from "./middlewares/LimiterHandler";
import ResponseHandler from "./middlewares/ResponseHandler";

import dbConn from "./middlewares/dbcons/dbConn";

const PORT = process.env.PORT || 8008;
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

// set up error handler
app.use(ErrorHandler);

async function connectDatabases() {
  try {
    await dbConn.authenticate();
    console.log("-------- DB connected --------");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}


(async () => {
  try {
    let server: any;
    await connectDatabases();
    if (NODE_ENV !== "production") {
      server = app.listen(PORT, () => {
        console.info(`Server Http is running in ${NODE_ENV} on PORT ${PORT}`);
      });
    } else {
      const credential = {
        key: readFileSync("/etc/ssl/api/api_rsisjs_id.key"),
        cert: readFileSync("/etc/ssl/api/api_rsisjs_id.crt"),
        ca: readFileSync("/etc/ssl/api/api_rsisjs_id.ca-bundle.crt"),
      };
      server = https.createServer(credential, app);
      server.listen(PORT, () => {
        console.log(`Server Https is running in ${NODE_ENV} on PORT ${PORT}`);
      });
    }
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }
})();
