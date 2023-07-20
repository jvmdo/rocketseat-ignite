import http from "node:http";
import { bodyParser } from "./middlewares/body-parser.js";
import { createDatabase } from "./lib/create-database.js";

const db = await createDatabase();

const server = http.createServer(async (req, res) => {
  await bodyParser(req, res);

  //* POST
  const task = req.body;
  let newTask;

  try {
    newTask = await db.create(task);
  } catch (error) {
    return res.writeHead(404).end(error.message);
  }

  return res.end(JSON.stringify(newTask));

  //* GET
  /* try {
    const tasks = db.read();

    return res.end(JSON.stringify(tasks));
  } catch (error) {
    return res.writeHead(500).end(error.message);
  } */
});

server.listen(3333);
