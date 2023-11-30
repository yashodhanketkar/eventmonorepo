import express from "express";
import { basename, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {
  HOST,
  MainRouter,
  PORT,
  configApp,
  mongoConnection,
} from "./config/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __basedir = dirname(__filename);
export const __dirname = resolve(__basedir, "..");

// apply configs
app.use(configApp);
mongoConnection();

app.use("/api", MainRouter);

app.get("/", (_req, res) => {
  res
    .status(200)
    .json({
      "Server Status": "OK",
      Name: "Events API",
    })
    .end();
});

app.listen(PORT, HOST, () => {
  console.log("Server is running");
});
