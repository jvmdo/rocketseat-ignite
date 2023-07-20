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

      return res.writeHead(201).end(JSON.stringify(newTask));
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
    path: buildPathRegex("/tasks/:taskId"),
    handler: async (req, res) => {
      const { taskId } = req.params;
      let updatedTask;

      try {
        updatedTask = await db.update(taskId, req.body);
      } catch (error) {
        if (error instanceof TypeError) {
          return res.writeHead(400).end(error.message);
        }
        return res.writeHead(404).end(error.message);
      }

      return res.writeHead(201).end(JSON.stringify(updatedTask));
    },
  },
  {
    method: "DELETE",
    path: buildPathRegex("/tasks/:taskId"),
    handler: async (req, res) => {
      const { taskId } = req.params;
      let deletedTask;

      try {
        deletedTask = await db.delete(taskId);
      } catch (error) {
        return res.writeHead(404).end(error.message);
      }

      return res.end(JSON.stringify(deletedTask));
    },
  },
  {
    method: "PATCH",
    path: buildPathRegex("/tasks/:taskId"),
    handler: async (req, res) => {
      const { taskId } = req.params;
      let updatedTask;

      try {
        updatedTask = await db.patch(taskId);
      } catch (error) {
        return res.writeHead(404).end(error.message);
      }

      return res.writeHead(201).end(JSON.stringify(updatedTask));
    },
  },
];
