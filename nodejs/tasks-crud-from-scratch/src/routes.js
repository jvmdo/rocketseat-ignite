import { randomUUID } from "node:crypto";
import { buildPathRegex } from "./utils/build-path-regex.js";
import { createDatabase } from "./lib/create-database.js";

const db = await createDatabase();

export const routes = [
  {
    method: "POST",
    path: buildPathRegex("/tasks"),
    handler: async (req, res) => {
      let newTask;

      try {
        newTask = await db.create(req.body);
      } catch (error) {
        return res.writeHead(400).end(error.message);
      }

      return res.end(JSON.stringify(newTask));
    },
  },
];
