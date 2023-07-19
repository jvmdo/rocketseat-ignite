import { Database } from "../data/database.js";
import { stat } from "fs/promises";

const dbPath = new URL("../data/db.ndjson", import.meta.url);
const tasksPath = new URL("../data/filler-tasks.csv", import.meta.url);

export async function createDatabase() {
  const db = new Database(dbPath);

  if (await isDatabaseEmpty()) {
    await db.initializer(tasksPath);
  }

  return db;
}

async function isDatabaseEmpty() {
  let stats;

  try {
    stats = await stat(dbPath);
  } catch (err) {
    throw err;
  }

  return stats.size === 0;
}
