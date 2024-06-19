import "dotenv/config";
import express from "express";
import cors from "cors";
import { testConnection } from "./database/db.js";

import noteRoutes from "./route/notes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", noteRoutes);

const PORT = process.env.APP_PORT;
app.listen(PORT, async () => {
  await testConnection();
  console.log(`App running on port ${PORT}`);
});
