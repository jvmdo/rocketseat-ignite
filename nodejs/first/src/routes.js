import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const db = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = db.select("users", search);

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;
      const newUser = { id: randomUUID(), name, email };

      db.insert("users", newUser);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:userId"),
    handler: (req, res) => {
      const { userId } = req.params;
      const { name, email } = req.body;

      db.update("users", userId, { name, email });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:userId"),
    handler: (req, res) => {
      const { userId } = req.params;

      db.delete("users", userId);

      return res.writeHead(204).end();
    },
  },
];
