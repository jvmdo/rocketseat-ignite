import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { parse } from "csv-parse";

export class Database {
  #dbPath;
  #tasks;

  constructor(dbPath) {
    this.#dbPath = dbPath;
    this.#tasks = [];

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(this.#tasks), "utf8");
      console.log(`Database created at ${dbPath}`);
    } else {
      const data = fs.readFileSync(dbPath, { encoding: "utf8" });
      this.#tasks = JSON.parse(data);
      console.log(`[tasks] populated from ${dbPath}`);
    }
  }

  async initializer(tasksPath) {
    try {
      const parser = fs
        .createReadStream(tasksPath)
        .pipe(parse({ encoding: "utf8", bom: true, columns: true }));

      for await (const task of parser) {
        this.create(task);
      }
    } catch (err) {
      throw err;
    }

    console.log(`Database populated with ${tasksPath} data`);
  }

  async #persist() {
    await writeFile(this.#dbPath, JSON.stringify(this.#tasks));
  }

  async create(task) {
    if (!task || typeof task !== "object" || Array.isArray(task)) {
      throw new TypeError("Expected [task] to be an actual object");
    }

    const { title, description } = task;

    if (title === undefined || description === undefined) {
      throw new TypeError("Missing either [title] or [description] properties");
    }

    const newTask = {
      id: randomUUID(),
      title,
      description,
      completedAt: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.#tasks.push(newTask);

    try {
      await this.#persist();
    } catch (err) {
      console.error(err);
    }

    return newTask;
  }

  read() {
    return this.#tasks;
  }
}
