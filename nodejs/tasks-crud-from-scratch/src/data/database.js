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

  async create(task) {
    const { title, description } = this.#getPropsOrThrow(task);

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
    await this.#persist();

    return newTask;
  }

  read(title, description) {
    if (title || description) {
      return this.#tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(title?.toLowerCase()) ||
          task.description.toLowerCase().includes(description?.toLowerCase())
        );
      });
    }

    return this.#tasks;
  }

  async update(taskId, taskBody) {
    const { title, description } = this.#getPropsOrThrow(taskBody);

    if (title === undefined && description === undefined) {
      throw new TypeError("You must provide either a [title] or [description]");
    }

    const { task, taskIndex } = this.#findTaskById(taskId);

    const updatedTask = {
      ...task,
      title: title ?? task.title,
      description: description ?? task.description,
      updatedAt: Date.now(),
    };

    this.#tasks.splice(taskIndex, 1, updatedTask);
    await this.#persist();

    return updatedTask;
  }

  async delete(taskId) {
    const { taskIndex } = this.#findTaskById(taskId);

    const deletedTask = this.#tasks.splice(taskIndex, 1);
    await this.#persist();

    return deletedTask[0];
  }

  async patch(taskId) {
    const { task, taskIndex } = this.#findTaskById(taskId);
    const status = task.completedAt;

    const updatedTask = {
      ...task,
      completedAt: Boolean(status) ? null : Date.now(),
    };

    this.#tasks.splice(taskIndex, 1, updatedTask);
    await this.#persist();

    return updatedTask;
  }

  async #persist() {
    try {
      await writeFile(this.#dbPath, JSON.stringify(this.#tasks));
    } catch (err) {
      console.error(err);
    }
  }

  #findTaskById(taskId) {
    const taskIndex = this.#tasks.findIndex((task) => task.id === taskId);

    if (!~taskIndex) {
      throw new Error(`No task found in the database for the ID ${taskId}.`);
    }

    return { task: this.#tasks[taskIndex], taskIndex };
  }

  #getPropsOrThrow(task) {
    if (!task || typeof task !== "object" || Array.isArray(task)) {
      throw new TypeError("Expected [task] to be an actual object");
    }

    return task;
  }
}
