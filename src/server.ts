import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import customResponse from "./utils/customResponse";
import defaultController from "./controllers/defaultController";

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3001", "https://gym-server-i9wq.onrender.com"] }));
app.use(customResponse);

app.use("", defaultController);

app.use(function (req, res) {
  res.status(404).json({ message: "Erro ao acessar a rota" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}/docs`);
});
