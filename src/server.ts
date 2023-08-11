import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import customResponse from "./utils/customResponse";
import defaultController from "./controllers/defaultController";
import authController from "./controllers/authController";
import userController from "./controllers/userController";

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3001"] }));
app.use(customResponse);

app.use("", defaultController);
app.use("/api", authController);
app.use("/api", userController);

app.use(function (req, res) {
  res.status(404).json({ message: "Erro ao get touter" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${HOSTNAME}:${PORT}/docs`);
});
