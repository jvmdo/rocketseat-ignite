import http from "node:http";
import { bodyParser } from "./middlewares/body-parser.js";
import { createDatabase } from "./lib/create-database.js";

const db = await createDatabase();

const server = http.createServer(async (req, res) => {
  await bodyParser(req, res);

  const task = req.body;
  const newTask = await db.create(task);

  return res.end(newTask);
});

server.listen(3333).on("close", () => {
  db.destructor();
});
