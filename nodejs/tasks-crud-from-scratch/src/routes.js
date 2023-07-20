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
  {
    method: "GET",
    path: buildPathRegex("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.query;
      let decodedTitle, decodedDescription;

      if (title) decodedTitle = decodeURIComponent(title);
      if (description) decodedDescription = decodeURIComponent(description);

      const tasks = db.read(decodedTitle, decodedDescription);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildPathRegex("/tasks/:userId"),
    handler: (req, res) => {
      const { userId } = req.params;
      const { name, email } = req.body;

      db.update("users", userId, { name, email });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildPathRegex("/tasks/:userId"),
    handler: (req, res) => {
      const { userId } = req.params;

      db.delete("users", userId);

      return res.writeHead(204).end();
    },
  },
];
